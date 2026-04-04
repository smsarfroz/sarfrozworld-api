import { body, validationResult } from 'express-validator';
import prisma from '../../prisma/queries.js';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const validateDetails = [
    body('bio').trim().escape().isLength({ max: 300 }),
    body('github').trim().matches(/^[a-zA-Z0-9-]+$/).isLength({ min: 1, max: 39 }),
    body('website').trim().matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)
];

const updateUser = [validateDetails, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const cleanBio = purify.sanitize(req.body.bio);
    try {
        const { userId, bio, github, website } = req.body;
        const user = await prisma.updateUserbyUserId(userId, cleanBio, github, website);
 
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}];

export default updateUser;