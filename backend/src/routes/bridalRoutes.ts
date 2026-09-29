import { Router } from "express";
import {
  getBridalCollections,
  getBridalCollectionBySlug,
  createBridalCollection,
  updateBridalCollection,
  deleteBridalCollection,
} from "../controllers/bridalController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBridalCollections);
router.get("/slug/:slug", getBridalCollectionBySlug);
router.post("/", authMiddleware, adminMiddleware, createBridalCollection);
router.put("/:id", authMiddleware, adminMiddleware, updateBridalCollection);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBridalCollection);

export default router;
