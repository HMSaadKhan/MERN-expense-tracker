import { Router } from "express";
import { allUser, createUser, loginUser, updatePassword,forgotPassword, resetPassword } from "../controller";
import { authenticateToken } from "./../middlewares/authentication/index";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", allUser);
router.put("/update-password", authenticateToken, updatePassword);
router.post("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)

export default router;
