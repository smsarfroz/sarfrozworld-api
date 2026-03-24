import prisma from '../../prisma/queries.js';

const followUser = async(req, res) => {
    try {
        const { id1, id2 } = req.body;
        await prisma.followUser(id1, id2);

        res.json('done');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default followUser;

