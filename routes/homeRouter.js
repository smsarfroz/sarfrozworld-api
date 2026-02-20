import { Router } from "express";
import getAllPosts from "../controllers/homeRouter/getAllPosts.js";

const homeRouter = Router();

homeRouter.post("/", getAllPosts);

export default homeRouter;