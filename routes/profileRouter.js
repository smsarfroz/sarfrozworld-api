import { Router } from "express";

const profileRouter = Router();

profileRouter.get("/", (req, res) => {
    res.send(`profile page`);
});

export default profileRouter;