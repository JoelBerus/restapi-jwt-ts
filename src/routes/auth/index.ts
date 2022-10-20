import { Router } from "express";
import { signup, signin, profile } from "../../controller/auth/auth.controller";
import { tokenValidate } from "../../libs/validateToken";
import { signupValidator, signinValidator } from "../../validator/auth/index";

const router: Router = Router();

router.post("/signup", signupValidator, signup);
router.post("/signin", signinValidator, signin);
router.get("/profile", tokenValidate, profile);

export default router;
