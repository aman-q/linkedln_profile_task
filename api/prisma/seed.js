import  { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      fname: 'Doe',
      sname: 'Jhon',
      password: '123456',
      profilePicture: 'https://unsplash.com/photos/a-woman-with-a-straight-face-JRa8lCQQhSs',
      bannerImage: 'https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-forest-in-the-distance-ZW0C8TlPG_A',
      socialLinks: {
        create: [
          {
            platform: 'GitHub',
            url: 'https://github.com/johndoe', 
          },
          {
            platform: 'LinkedIn',
            url: 'https://linkedin.com/in/johndoe',
          },
        ],
      },
      experiences: {
        create: [
          {
            company: 'Tech Corp',
            designation: 'Software Engineer',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2023-01-01'),
          },
        ],
      },
      projects: {
        create: [
          {
            description: 'A cool project',
            url: 'https://github.com/johndoe/cool-project',
          },
        ],
      },
      achievements: {
        create: [
          {
            name: 'Hackathon Winner',
            year: 2023,
            details: 'Won first place in the national hackathon',
          },
        ],
      },
      certifications: {
        create: [
          {
            name: 'Certified Web Developer',
            authority: 'Tech Institute',
            issueDate: new Date('2022-06-01'),
          },
        ],
      },
      ranking: {
        create: {
          points: 150,
        },
      },
    },
  });

  console.log('Created user:', user);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
