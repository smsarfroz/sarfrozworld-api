import { Router } from "express";
import prisma from '../../prisma/queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const validateUser = [
    body('username')   
        .trim().escape()
        // .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),

    /* body('password') 
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
        .matches(/\d/).withMessage('Password must container a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'), */
];

const login = [validateUser, async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    // console.log('check user details', user.username, user.password);
    const errors = validationResult(req);
    if (!errors.isEmpty() && !(user.username == "Guest User" && user.password == "sharedpassword123")) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const User = await prisma.getUserbyUserName(req.body.username);

        // console.log("User", User);
        if (!User) {   
            return res.status(401).json({ error: `user ${req.body.username} doesn't exist.` });
        }
        
        let guest = false;
        if (user.username == "Guest User" && user.password == "sharedpassword123") {
            guest = true;
        }

        const isPasswordValid = await bcrypt.compare(user.password, User.password);

        if (!isPasswordValid && !guest) {
            return res.status(401).json({ error: "Wrong password. Please try again."});
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
}];

export default login;