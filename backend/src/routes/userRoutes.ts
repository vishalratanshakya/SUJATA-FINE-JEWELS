import { Router } from "express";
import { getMe, updateProfile, getAllUsers, getUserById } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, getMe);
router.get("/:id", authMiddleware, getUserById);
router.put("/profile", authMiddleware, updateProfile);

export default router;
