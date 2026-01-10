import prisma from '../../prisma/queries.js';

const getUser = async(req, res) => {
    try {
        console.log('req.user.username', req.user.username);
        const user = await Promise.all([prisma.getUserbyUserName(req.user.username)]);

        console.log('user found from table ', user);
        res.json(user);
    } catch (error) {
        console.error(error);
    }
};

export default getUser;