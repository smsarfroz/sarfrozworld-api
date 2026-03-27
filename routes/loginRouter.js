import { Router } from "express";
import prisma from '../prisma/queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const loginRouter = Router();

loginRouter.post("/", async(req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        const User = await prisma.getUserbyUserName(req.body.username);

        console.log("User", User);
        if (!User) {    
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(user.password, User.password);

        console.log('isPasswordValid', isPasswordValid, user.password, User.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials"});
        }

        const payload = {
            userId: User.id, 
            username: User.username
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'}, (err, token) => {
            // res.json({User, token}); 

            if (err) throw err;

            res.status(200).json({
                user: {
                    id: User.id,
                    username: User.username
                },
                token: token
            })
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Server error during login" });
    }
});

export default loginRouter;