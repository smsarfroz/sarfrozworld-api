import prisma from '../../prisma/queries.js';

const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const id = parseInt(postId);
        const post = await prisma.getPostbyPostId(id);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default getPost;