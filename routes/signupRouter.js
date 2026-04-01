import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from '../prisma/queries.js';
import crypto from 'crypto';
import signup from "../controllers/signUpRouter/signup.js";

const signupRouter = Router();

signupRouter.post("/", signup);

export default signupRouter;