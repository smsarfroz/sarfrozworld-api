import prisma from '../../prisma/queries.js';

const getAllPosts = async(req, res) => {
    try {
        const { currentCat } = req.body;
        const posts = await (currentCat == 0 ?  prisma.getAllPosts() : prisma.getAllPostsbyLikes());
        // console.log('posts in getAllPosts', posts);
        res.json(posts);
    } catch (error) {
        console.error(error);
    }
};

export default getAllPosts; 