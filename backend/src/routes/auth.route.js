import express from "express"
import { checkAuth, login, logout, signup, UpdateProfile } from "../controllers/auth.controller.js";
import { Protect_Routes } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/login",login);

router.post("/logout",logout)

router.put("/update-profile/:_id", UpdateProfile)

router.get("/check", checkAuth);

export default router;
