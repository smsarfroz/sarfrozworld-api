import { body, validationResult } from 'express-validator';
import prisma from '../../prisma/queries.js';
import crypto from 'crypto';

function getGravatarHash(email) {
  email = email.trim().toLowerCase();
   
  const hash = crypto.createHash('sha256').update(email).digest('hex');
   
  return hash;
}

const validateUser = [
    body('username')   
        .trim().escape()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),

    body('password') 
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
        .matches(/\d/).withMessage('Password must container a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
];

const signup = [validateUser, async(req, res) => {
    const errors = validationResult(req);
    console.log("errors", errors, errors.array());
    if (!errors.isEmpty()) {
        console.log(true);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hash = getGravatarHash(`${req.body.username}@gmail.com`);
        const profileUrl = `https://gravatar.com/avatar/${hash}?s=256&d=identicon`;
        console.log('hashedPassord', hashedPassword, hash);
        const user = await prisma.addnewuser(req.body.username, hashedPassword, profileUrl);
        res.json(user);
    } catch (error) {
        console.error(error);
    }
}];

export default signup;