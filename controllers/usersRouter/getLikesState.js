import prisma from '../../prisma/queries.js';

const getLikesStateArray = async(req, res) => {
    try {
        const { userId } = req.body;
        const likesStateArray = await prisma.getLikesStateArray(userId);
        
        res.json(likesStateArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getLikesStateArray;
