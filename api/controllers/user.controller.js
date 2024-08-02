import prisma from '../lib/prisma.js'; 

export const registerUser = async (req, res) => {
  const {
    email,
    fname,
    sname,
    password,
    socialLinks,
    experiences,
    projects,
    achievements,
    certifications,
  } = req.body;

  const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].path : null;
  const bannerImage = req.files.bannerImage ? req.files.bannerImage[0].path : null;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        fname,
        sname,
        password,
        profilePicture,
        bannerImage,
        socialLinks: socialLinks ? { create: JSON.parse(socialLinks) } : undefined,
        experiences: experiences ? { create: JSON.parse(experiences) } : undefined,
        projects: projects ? { create: JSON.parse(projects) } : undefined,
        achievements: achievements ? { create: JSON.parse(achievements) } : undefined,
        certifications: certifications ? { create: JSON.parse(certifications) } : undefined,
      },
    });

    res.redirect(`/user/profile/${user.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user profile');
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        socialLinks: true,
        experiences: true,
        projects: true,
        achievements: true,
        certifications: true,
        ranking: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user profile');
  }
};
