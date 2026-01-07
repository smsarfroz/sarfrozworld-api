import { Router } from "express";

const searchRouter = Router();

searchRouter.get("/", (req, res) => {
    res.send(`search page`);
});

export default searchRouter;