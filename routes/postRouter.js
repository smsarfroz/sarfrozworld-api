import { Router } from "express";
import addPost from "../controllers/postRouter/addPost.js";
import updatePost from "../controllers/postRouter/updatePost.js";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.send(`post page`);
});
// postRouter.get('/:postid', )
postRouter.post("/", addPost);
postRouter.put("/update", updatePost);

export default postRouter;