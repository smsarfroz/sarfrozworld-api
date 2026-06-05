import commentRouter from "../../routes/commentRouter.js";
import express from "express";
import request from "supertest";
import prisma from "../../prisma/queries.js";
import usersRouter from "../routes/usersRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter)

jest.mock('../../prisma/queries.js', () => ({
    followUser: jest.fn(),
}));

describe('test usersRouter controller functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

})