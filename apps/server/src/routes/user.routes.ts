import { Router } from "express";
import userControllers from "../controllers/user.controllers";

const router = Router();

router.post("/signup", userControllers.signUp);
router.post("/login", userControllers.login);

export default router;
