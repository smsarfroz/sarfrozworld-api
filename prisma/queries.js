import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllPosts() {
    try {
        const posts = await prisma.Post.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return posts;
    } catch (error) {
        console.error(error);
    }
};

async function getAllPostsbyLikes() {
    try {
        const posts = await prisma.Post.findMany({
            include: {
                user: true
            },
            orderBy: {
                likes: 'desc'
            }
        });
        return posts;
    } catch (error) {
        console.error(error);
    }
}

async function getAllPostsbyUserId(userId) {
    try {       
        const posts = await prisma.Post.findMany({
            where: {
                userId: userId
            }, 
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return posts; 
    } catch (error) {
        console.error(error);
    }
}

async function getAllCommentsbyPostid(postId) {
    try {
        const comments = await prisma.Comment.findMany({
            where: {
                postId: postId
            },
            include: {
                user: true
            }
        })
        return comments;
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

async function addnewuser(username, password, photo) {
    try {
        const user = await prisma.User.create({
            data: {
                username: username,
                password: password,
                photo: photo
            }
        })
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function getUserbyUserId(userId) {
    try {
        let user = await prisma.User.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: true
            }
        })
        return user;
    } catch (error) {
        console.error(error);
    }
}


async function updateUserbyUserId(userId, bio, github, website) {
    console.log('query function', userId, bio);
    try {
        const UpdateUser = await prisma.User.update({
            where: {
                id: userId
            },
            data: {
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

async function addPost(userId, text, imageLink) {
    try {
        const post = await prisma.Post.create({
            data: {
                // userId: userId,
                text: text,
                ...(imageLink && { imageLink: imageLink }),
                user: {
                    connect: { id: userId }
                }
            }
        }) 
        return post; 
    } catch (error) {
        console.error(error);
    }
}

async function updatePostInc(postId, userId) {
    try {
        const post = await prisma.Post.update({
            where: {
                id: postId
            },
            data: {
                likes: {
                    increment: 1
                }, 
                likedByUsers: {
                    push: userId
                }
            }
        })
        return post;
    } catch (error) {
        console.error(error);
    }
}

async function updatePostDec(postId, userId) {
    try {
        const post = await prisma.Post.findUnique({
            where: {
                id: postId
            }
        });

        const updatedArray = post.likedByUsers.filter(
            (id) => id !== userId
        );

        const post2 = await prisma.Post.update({
            where: {
                id: postId
            },
            data: {
                likes: {
                    decrement: 1
                }, 
                likedByUsers: updatedArray
            }
        })
        return post2;
    } catch (error) {
        console.error(error);
    }
}

async function getLikesStateArray(userId) {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            likes: true,
            likedByUsers: true
        }
    });

    const likesState = posts.reduce((accumulator, currentPost) => {
        accumulator[currentPost.id] = {
            liked: currentPost.likedByUsers.includes(userId),
            likesCount: currentPost.likes
        }
        return accumulator;
    },{});

    return likesState;
}

async function deletePost(postId) {
    const post = await prisma.post.delete({
        where: {
            id: postId
        }
    });
    return post;
}

export default {
    getAllPosts,
    getAllCommentsbyPostid,
    deleteCommentbyId,
    postComment,
    getUserbyUserId,
    updateUserbyUserId,
    addPost,
    addnewuser,
    getAllPostsbyUserId,
    getAllPostsbyLikes,
    updatePostInc,
    updatePostDec,
    getLikesStateArray,
    deletePost
}






