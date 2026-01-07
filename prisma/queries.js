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

async function findOrCreate(googleId ,username, photo) {
    try {   
        let user = await prisma.User.upsert({
            where: { googleId: googleId},
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

export default {
    getAllPosts,
    getAllCommentsbyPostid,
    deleteCommentbyId,
    postComment,
    findOrCreate
}