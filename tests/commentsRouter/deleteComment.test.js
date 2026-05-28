import commentRouter from "../../routes/commentRouter.js";
import express from "express";
import request from "supertest";
import prisma from "../../prisma/queries.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/posts/:postId/comments', commentRouter)

jest.mock('../../prisma/queries.js', () => ({
    deleteComment: jest.fn()
}));

describe('DELETE /posts/:postId/comments/:commentId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('should delete the comment', async () => {
        prisma.deleteComment.mockResolvedValue({
            postId: 1,
            userId: 1,
            content: "first comment"
        });

        const postId = 1;
        const commentId = 1;

        const response = await request(app)
            .delete(`/posts/${postId}/comments/${commentId}`)
            .expect("Content-Type", "application/json; charset=utf-8")
            // .expect(response => {console.log(response)})
            .expect(200);

        expect(response.body.message).toEqual('comment deleted successfully');
    })
})