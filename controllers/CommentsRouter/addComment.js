import prisma from '../../prisma/queries.js';
import sanitizeHtml from 'sanitize-html';

const addComment = async(req, res) => {
    try {
        const { postId, userId, content } = req.body;
        const cleantComment = sanitizeHtml(content, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
            allowedAttributes: { 'a': [ 'href' ] }
        });
        if (cleantComment.length > 500 ) return res.status(400).send("Comment too long");
        const comment = await prisma.addComment(postId, userId, cleantComment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default addComment;