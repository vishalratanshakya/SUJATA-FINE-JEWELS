import { Router } from "express";
import { getAnnouncementBar, updateAnnouncementBar } from "../controllers/announcementBarController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAnnouncementBar);
router.put("/", authMiddleware, adminMiddleware, updateAnnouncementBar);

export default router;
