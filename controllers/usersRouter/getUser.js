import prisma from '../../prisma/queries.js';

const getUser = async(req, res) => {
    try {
        const { userId } = req.body;
        if (userId == undefined) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await prisma.getUserbyUserId(userId);

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getUser;
