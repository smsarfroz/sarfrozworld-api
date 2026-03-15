import { Router } from "express";
import express from 'express';
import addComment from "../controllers/CommentsRouter/addComment.js";
import getAllComments from "../controllers/CommentsRouter/getAllComments.js";
import deleteComment from "../controllers/CommentsRouter/deleteComment.js";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/", getAllComments);
commentRouter.delete("/:commentId", deleteComment);
commentRouter.post("/", addComment);

export default commentRouter;