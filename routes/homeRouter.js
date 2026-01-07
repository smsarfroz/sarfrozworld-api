import { Router } from "express";
import getAllPosts from "../controllers/homeRouter/getAllPosts.js";

const homeRouter = Router();

homeRouter.get("/", getAllPosts);

export default homeRouter;