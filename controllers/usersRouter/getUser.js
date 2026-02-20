import prisma from '../../prisma/queries.js';

const getUser = async(req, res) => {
    try {
        // console.log('req.body', req.body);
        // if (!req.user || !req.user.username) {
        //     return res.status(401).json({ error: 'Not authenticated' });
        // }
        // console.log('req.user.username', req.user.username);
        const { userId } = req.body;
        const user = await Promise.all([prisma.getUserbyUserId(userId)]);

        // console.log('user found from table ', user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getUser;
