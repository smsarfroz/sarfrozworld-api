import { Router } from "express";
import getUser from "../controllers/usersRouter/getUser.js";
import updateUser from "../controllers/usersRouter/updateUser.js";
import getLikesStateArray from "../controllers/usersRouter/getLikesState.js";
import getAllUsers from "../controllers/usersRouter/getAllUsers.js";
import followUser from "../controllers/usersRouter/followUser.js";
import unfollowUser from "../controllers/usersRouter/unfollowUser.js";

const usersRouter = Router();

usersRouter.post("/profile", getUser);
usersRouter.post("/profile/update", updateUser);    
usersRouter.get("/", getAllUsers);
usersRouter.post("/likesState", getLikesStateArray);
usersRouter.post("/follow", followUser);
usersRouter.post("/unfollow", unfollowUser);

export default usersRouter;