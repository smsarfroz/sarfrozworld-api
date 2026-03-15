import prisma from '../../prisma/queries.js';

const addComment = async(req, res) => {
    try {
        const { postId, userId, content } = req.body;
        const comment = await prisma.addComment(postId, userId, content);
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default addComment;