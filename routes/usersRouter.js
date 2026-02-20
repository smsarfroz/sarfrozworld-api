import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser.js";
import updateUser from "../controllers/usersRouter/updateUser.js";

const usersRouter = Router();

usersRouter.post("/profile", getUser);
usersRouter.post("/profile/update", updateUser);    
// usersRouter.get("/", getAllUsers);

export default usersRouter;