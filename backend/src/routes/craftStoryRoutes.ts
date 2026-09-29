import { Router } from "express";
import {
  getCraftStories,
  createCraftStory,
  updateCraftStory,
  deleteCraftStory,
} from "../controllers/craftStoryController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getCraftStories);
router.post("/", authMiddleware, adminMiddleware, createCraftStory);
router.put("/:id", authMiddleware, adminMiddleware, updateCraftStory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCraftStory);

export default router;
