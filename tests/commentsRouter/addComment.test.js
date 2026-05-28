import commentRouter from "../../routes/commentRouter.js";
import express from "express";
import request from "supertest";
import prisma from "../../prisma/queries.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/posts/:postId/comments', commentRouter)

jest.mock('../../prisma/queries.js', () => ({
    addComment: jest.fn()
}));

describe('POST /posts/:postId/comments', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('should add a comment', async () => {
        prisma.addComment.mockResolvedValue({
            postId: 1,
            userId: 1,
            content: "first comment"
        });

        const postId = 1;
        const requestBody = {
            postId: 1,
            userId: 1,
            content: "first comment"
        }

        const response = await request(app)
            .post(`/posts/${postId}/comments`)
            .send(requestBody)
            .expect("Content-Type", "application/json; charset=utf-8")
            // .expect(response => {console.log(response)})
            .expect(200);

        expect(response.body.message).toEqual('comment added successfully');
    })
})