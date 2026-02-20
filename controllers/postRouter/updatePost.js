import prisma from '../../prisma/queries.js';

const updatePost = async(req, res) => {
    try {
        const { postId, delta, userId } = req.body;
        const post = (delta === 1 ? await prisma.updatePostInc(postId, userId) : await prisma.updatePostDec(postId, userId));
        console.log('updated post', post);
        // res.json(post);
    } catch (error) {
        console.error(error);
    }
};

export default updatePost;