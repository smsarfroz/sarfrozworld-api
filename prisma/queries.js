import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllPosts() {
    try {
        const posts = await prisma.Post.findMany({
            include: {
                user: true,
                comments: true
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
                user: true,
                comments: true
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
                user: true,
                comments: true
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
        console.log('userId in query', userId);
        let user = await prisma.User.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    include: {
                        comments: true
                    }
                }
            }
        })
        console.log('user in prisma query', user);
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function getUserbyUserName(username) {
    try {
        let user = await prisma.User.findUnique({
            where: {
                username: username
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    try {
        let users = await prisma.User.findMany();
        return users;
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
        console.log("imageLink", imageLink);
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

async function deleteComment(commentId) {
    const comment = await prisma.Comment.delete({
        where: {
            id: commentId
        }
    });
    return comment;
}

async function getPostbyPostId(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            user: true,
            comments: true
        }
    });
    return post;
}

async function addComment(postId, userId, content) {
    const comment = await prisma.Comment.create({
        data: {
            content: content,
            post: {
                connect: { id: postId }
            },
            user: {
                connect: { id: userId }
            }
        },
        include: {
            user: true,
            post: true
        }
    });
    return comment;
}

async function followUser(id1, id2) {
    try {
        const user1 = await prisma.user.update({
            where: {
                id: id1
            },
            data: {
                following: {
                    push: id2
                }
            }
        })
        const user2 = await prisma.user.update({
            where: {
                id: id2
            },
            data: {
                followers: {
                    push: id1
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
}

async function unfollowUser(id1, id2) {
    try {
        const user1 = await prisma.user.findUnique({
            where: {
                id: id1
            }
        });

        const updatedList1 = user1.following.filter(
            id => id != id2
        );

        const user2 = await prisma.user.findUnique({
            where: {
                id: id1
            }
        });

        const updatedList2 = user1.followers.filter(
            id => id != id1
        );


        await prisma.user.update({
            where: {
                id: id1
            },
            data: {
                following: updatedList1
            }
        })
        await prisma.user.update({
            where: {
                id: id2
            },
            data: {
                followers: updatedList2
            }
        })
    } catch (error) {
        console.error(error);
    }
}


export default {
    getAllPosts,
    getAllCommentsbyPostid,
    deleteCommentbyId,
    postComment,
    getUserbyUserId,
    getUserbyUserName,
    updateUserbyUserId,
    addPost,
    addnewuser,
    getAllPostsbyUserId,
    getAllPostsbyLikes,
    updatePostInc,
    updatePostDec,
    getLikesStateArray,
    deletePost,
    getUsers,
    getPostbyPostId,
    addComment,
    deleteComment,
    followUser,
    unfollowUser
}   






