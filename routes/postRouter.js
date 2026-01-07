import { Router } from "express";
import addPost from "../controllers/postRouter/addPost.js";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.send(`post page`);
});
// postRouter.get('/:postid', )
postRouter.post("/", addPost);

export default postRouter;