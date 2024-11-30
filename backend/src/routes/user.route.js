import express from "express"
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();
import {verifyJWT} from "../middlewares/auth.middleware.js"

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/login").post(verifyJWT,loginUser);

export default router;