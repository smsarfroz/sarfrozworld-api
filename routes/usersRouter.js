import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser";

const usersRouter = Router();

usersRouter.get("/:username", getUser);

export default usersRouter;