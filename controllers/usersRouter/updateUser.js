import prisma from '../../prisma/queries.js';

const updateUser = async(req, res) => {
    try {
        // console.log('req.body', req.body);
        const { userId, bio, github, website } = req.body;
        const user = await Promise.all([prisma.updateUserbyUserId(userId, bio, github, website)]);

        // console.log('returned user', user);
        res.json(user);
    } catch (error) {
        console.error(error);
    }
};

export default updateUser;