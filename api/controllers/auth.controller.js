import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const  register = async (req, res) => {
  const { email, fname, sname, password, password_confirmation, profilePicture, bannerImage } = req.body;

  if (!email || !fname || !sname || !password || password !== password_confirmation) {
    return res.status(400).json({ message: 'Please fill in all fields and ensure passwords match' });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email,
        fname,
        sname,
        password: hashedPassword,
        profilePicture,
        bannerImage
      }
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Failed to create user!' });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: 'Invalid Credentials!' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Credentials!' });

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie('token', token, {
        httpOnly: true,
        // secure:true, // Uncomment this line if you're using HTTPS
        sameSite: 'strict',
      })
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
