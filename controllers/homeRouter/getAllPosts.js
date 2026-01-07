import prisma from '../../prisma/queries.js';

const getAllPosts = async(req, res) => {
    try {
        res.send(`Hello ${req.user.username}`);
    } catch (error) {
        console.error(error);
    }
};

export default getAllPosts;