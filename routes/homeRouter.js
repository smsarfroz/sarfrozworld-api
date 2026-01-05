import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

export default homeRouter;