import prisma from '../../prisma/queries.js';
import sanitizeHtml from 'sanitize-html';

const addPost = async(req, res) => {
    try {
        const { text, imageLink, userId } = req.body;
        const cleanContent = sanitizeHtml(text, {
            allowedTags: ['b', 'i', 'em', 'strong', 'p'], 
            allowedAttributes: { 'a': ['href'] }
        })
        if (cleanContent.length > 2000) return res.send(400).send("Post too long");
        const post = await prisma.addPost(userId, cleanContent, imageLink);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while adding the post.", error});
    }
};

export default addPost;