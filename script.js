// import { prisma } from './lib/prisma.js';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  const guest = await prisma.User.create({
    data: {
      username: "Guest User",
      password: "sharedpassword123",
      photo: "https://raw.githubusercontent.com/smsarfroz/sarfrozworld/refs/heads/main/src/assets/no-profile-picture-15258_256.png",
      followers: [],
      following: [],
      bio: "Hello! I am a shared guest account.",
      website: "",
      github: "https://github.com/"
    }
  });
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