import { Router } from "express";
import {
  getGiftingCollections,
  getGiftingCollectionBySlug,
  createGiftingCollection,
  updateGiftingCollection,
  deleteGiftingCollection,
} from "../controllers/giftingController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getGiftingCollections);
router.get("/slug/:slug", getGiftingCollectionBySlug);
router.post("/", authMiddleware, adminMiddleware, createGiftingCollection);
router.put("/:id", authMiddleware, adminMiddleware, updateGiftingCollection);
router.delete("/:id", authMiddleware, adminMiddleware, deleteGiftingCollection);

export default router;
