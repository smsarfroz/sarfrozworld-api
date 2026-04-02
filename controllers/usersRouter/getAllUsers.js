import prisma from '../../prisma/queries.js';

const getAllUsers = async(req, res) => {
    try {
        const users = await prisma.getUsers();
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getAllUsers;
