import prisma from '../../prisma/queries.js';

const getUser = async(req, res) => {
    try {
        console.log('req.user', req.user);
    } catch (error) {
        console.error(error);
    }
};

export default getUser;