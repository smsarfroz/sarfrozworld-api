import prisma from '../../prisma/queries.js';

const updateUser = async(req, res) => {
    try {
        const user = await Promise.all([prisma.updateUser(req.user.username)]);

        res.json(user);
    } catch (error) {
        console.error(error);
    }
};

export default updateUser;