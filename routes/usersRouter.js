import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser.js";

const usersRouter = Router();

usersRouter.get("/:username", getUser);
// usersRouter.get("/", getAllUsers);

export default usersRouter;