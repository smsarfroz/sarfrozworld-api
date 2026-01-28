import prisma from '../../prisma/queries.js';

const getUser = async(req, res) => {
    try {
        console.log('Request method:', req.method);
        console.log('req.user:', req.user);
        console.log('req.session:', req.session);
        // console.log('req.session.passport.user', req.session.passport.user);
        
        if (!req.user || !req.user.username) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        console.log('req.user.username', req.user.username);
        const user = await Promise.all([prisma.getUserbyUserName(req.user.username)]);

        console.log('user found from table ', user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export default getUser;