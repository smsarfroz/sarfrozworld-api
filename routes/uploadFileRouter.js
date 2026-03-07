import { Router } from "express";
import uploadFileController from "../controllers/uploadFileRouter/uploadFileController.js";
import multer from "multer";

const upload = multer({ dest: './public/data/uploads/' });

const uploadFileRouter = Router();

uploadFileRouter.post("/", upload.single('file'), uploadFileController);

export default uploadFileRouter;