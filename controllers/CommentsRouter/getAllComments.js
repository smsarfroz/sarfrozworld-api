import prisma from '../../prisma/queries.js';

const getAllComments = async(req, res) => {
    try {
        const { postId } = req.params;
        const id = parseInt(postId)
        const comments = await prisma.getAllCommentsbyPostid(id);
        res.status(200).json({
            message: "all comments returned successfully",
            comments: comments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default getAllComments;