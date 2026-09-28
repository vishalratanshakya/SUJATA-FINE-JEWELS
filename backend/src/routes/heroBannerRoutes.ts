import { Router } from "express";
import { getHeroBanners, createHeroBanner, updateHeroBanner, deleteHeroBanner, reorderHeroBanners } from "../controllers/heroBannerController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getHeroBanners);
router.post("/", authMiddleware, adminMiddleware, createHeroBanner);
router.put("/reorder", authMiddleware, adminMiddleware, reorderHeroBanners);
router.put("/:id", authMiddleware, adminMiddleware, updateHeroBanner);
router.delete("/:id", authMiddleware, adminMiddleware, deleteHeroBanner);

export default router;
