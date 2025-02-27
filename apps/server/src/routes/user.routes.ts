import { Router } from "express";
import userControllers from "../controllers/user.controllers";

const router = Router();

router.post("/signup",userControllers.signUp)


export default router