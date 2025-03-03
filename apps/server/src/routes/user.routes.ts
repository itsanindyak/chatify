import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import auth from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", userControllers.signUp);
router.post("/login", userControllers.login);

router.route("/logout").post(auth,userControllers.logout)

export default router;
