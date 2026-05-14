import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth.Controllers.js";

const router = express.Router()

router.post('/register', registerUser)
router.post("/login", loginUser)
router.post('/refresh-token', refreshAccessToken)
router.post('/logout', logoutUser)
export default router;