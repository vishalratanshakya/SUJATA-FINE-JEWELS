import { Router } from "express";
import { getAboutStory, updateAboutStory } from "../controllers/aboutController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAboutStory);
router.put("/", authMiddleware, adminMiddleware, updateAboutStory);

export default router;
