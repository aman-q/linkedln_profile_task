import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",verifyToken, register);
router.post("/login", login);

router.post("/logout", logout);

export default router;