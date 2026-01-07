import { Router } from "express";
import getAllCommentsbyPostid from "../prisma/queries.js";
import deleteCommentbyId from "../prisma/queries.js";

const commentRouter = Router();

// commentRouter.get("/", getAllCommentsbyPostid);
// commentRouter.delete("/:commentid", deleteCommentbyId);

export default commentRouter;