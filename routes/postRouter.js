import { Router } from "express";
import addPost from "../controllers/postRouter/addPost.js";
import updatePost from "../controllers/postRouter/updatePost.js";
import deletePost from "../controllers/postRouter/deletePost.js";
import getPost from "../controllers/postRouter/getPost.js";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.send(`post page`);
});
postRouter.get('/:postId', getPost);
postRouter.post("/", addPost);
postRouter.put("/update", updatePost);
postRouter.delete("/delete", deletePost);

export default postRouter;