import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser.js";
import updateUser from "../controllers/usersRouter/updateUser.js";
import getLikesStateArray from "../controllers/usersRouter/getLikesState.js";
import getAllUsers from "../controllers/usersRouter/getAllUsers.js";

const usersRouter = Router();

usersRouter.post("/profile", getUser);
usersRouter.post("/profile/update", updateUser);    
usersRouter.get("/", getAllUsers);
usersRouter.post("/likesState", getLikesStateArray);

export default usersRouter;