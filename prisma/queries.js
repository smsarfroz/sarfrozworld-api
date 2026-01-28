import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllPosts() {
    try {

    } catch (error) {
        console.error(error);
    }
};

async function getAllCommentsbyPostid() {
    try {

    } catch (error) {
        console.error(error);
    }
};

async function deleteCommentbyId() {
    try {

    } catch (error) {
        console.error(error);
    }
}

async function postComment() {
    try {

    } catch (error) {
        console.error(error);
    }
}

async function findOrCreate(googleId ,username , photo) {
    try {   
        let user = await prisma.User.upsert({
            where: { googleId: googleId},
            update: {
                
            },
            create: {
                googleId: googleId,
                username: username, 
                photo: photo
            }
        })
        return user;
    } catch (error) {
        console.error(error);
    }
};

async function getUserbyUserName(username) {
    try {
        let user = await prisma.User.findUnique({
            where: {
                username: username
            }
        })
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(username, followers, following, posts, bio, website, github) {
    try {
        const UpdateUser = await prisma.User.update({
            where: {
                username: username
            },
            data: {
                followers: followers,
                following: following,
                posts: posts, 
                bio: bio,
                website: website,
                github: github
            }
        })
        return UpdateUser;
    } catch (error) {   
        console.error(error);
    }
}

async function addPost(username, text, imageLink) {
    try {
        const post = await prisma.Post.create({
            data: {
                username: username,
                text: text,
                imageLink: imageLink
            }
        }) 
        return post; 
    } catch (error) {
        console.error(error);
    }
}

export default {
    getAllPosts,
    getAllCommentsbyPostid,
    deleteCommentbyId,
    postComment,
    findOrCreate,
    getUserbyUserName,
    updateUser,
    addPost
}