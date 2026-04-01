import { Router } from "express";
import prisma from '../prisma/queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import login from "../controllers/loginRouter/login.js";

const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;