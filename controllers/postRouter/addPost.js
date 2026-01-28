import prisma from '../../prisma/queries.js';

const addPost = async(req, res) => {
    try {
        const { text, imageLink } = req.body;
        console.log('req.user', req.user);
        const username = req.user.username;
        const post = await prisma.addPost(username, text, imageLink);
        res.json(post);
    } catch (error) {
        console.error(error);
    }
};

export default addPost;