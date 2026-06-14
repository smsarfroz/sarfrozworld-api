import prisma from '../../prisma/queries.js';

const deleteComment = async(req, res) => {
    try {
        const { commentId } = req.params;
        // console.log('commentId', commentId);
        const comment = await prisma.deleteComment(parseInt(commentId));
        res.status(200).json({
            message: "comment deleted successfully",
            comment: comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default deleteComment;