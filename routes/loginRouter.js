import { Router } from "express";
import prisma from '../prisma/queries.js';
import jwt from 'jsonwebtoken';

const loginRouter = Router();

loginRouter.post("/", async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const User = await prisma.getUserbyUserName(req.body.username);

    console.log('User', User, req.body.username);
    jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
        res.json({User, token});
    });
});

export default loginRouter;