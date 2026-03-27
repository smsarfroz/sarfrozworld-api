import { prisma } from './lib/prisma.js';

async function main() {
  // Create a new user with a post
  /* const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2)) */

  const guest = await prisma.User.create({
    data: {
      username: "Guest User",
      password: "sharedpassword123",
      photo: "https://github.com/smsarfroz/sarfrozworld/blob/main/src/assets/no-profile-picture-15258_256.png",
      followers: [],
      following: [],
      bio: "Hello! I am a shared guest account.",
      website: "",
      github: "https://github.com/"
    }
  });
  console.log('guest', guest);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })