import prisma from '../../prisma/queries.js';

const addPost = async(req, res) => {
    try {
        const { text, imageLink, userId } = req.body;
        // console.log('req.body in addPost', req.body);
        const post = await prisma.addPost(userId, text, imageLink);
        // console.log('returned post', post);
        res.json(post);
    } catch (error) {
        console.error(error);
    }
};

export default addPost;