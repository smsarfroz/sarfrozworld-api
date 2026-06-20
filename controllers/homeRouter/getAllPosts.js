import prisma from '../../prisma/queries.js';

const getAllPosts = async(req, res) => {
    try {
        const { currentCat } = req.body;
        const posts = await (currentCat == 0 ?  prisma.getAllPosts() : prisma.getAllPostsbyLikes());
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default getAllPosts; 