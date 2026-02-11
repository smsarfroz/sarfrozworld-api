import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from '../prisma/queries.js';
import crypto from 'crypto';

const signupRouter = Router();

function getGravatarHash(email) {
  email = email.trim().toLowerCase();
   
  const hash = crypto.createHash('sha256').update(email).digest('hex');
   
  return hash;
}

signupRouter.post("/", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hash = getGravatarHash(`${req.body.username}@gmail.com`);
        // const hash = getGravatarHash(`ssarfroz@gmail.com`);
        const profileUrl = `https://gravatar.com/avatar/${hash}?s=256&d=identicon`;
        console.log('hashedPassord', hashedPassword, hash);
        const user = await prisma.addnewuser(req.body.username, hashedPassword, profileUrl);
        res.json(user);
    } catch (error) {
        console.error(error);
    }
});

export default signupRouter;