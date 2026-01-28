import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser.js";
import updateUser from "../controllers/usersRouter/updateUser.js";

const usersRouter = Router();

usersRouter.get("/profile", getUser);
usersRouter.post("/profile", updateUser);    
// usersRouter.get("/", getAllUsers);

export default usersRouter;