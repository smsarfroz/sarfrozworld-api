import prisma from '../../prisma/queries.js';

const deletePost = async(req, res) => {
    try {
        const { postId } = req.body;
        const post = await prisma.deletePost(postId);
        // console.log('deleted post', post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default deletePost;