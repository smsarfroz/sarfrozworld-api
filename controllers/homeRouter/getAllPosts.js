import prisma from '../../prisma/queries.js';

const getAllPosts = async(req, res) => {
    try {
        res.send(`Hello ${req.user.displayName}`);
    } catch (error) {
        console.error(error);
    }
};

export default getAllPosts;