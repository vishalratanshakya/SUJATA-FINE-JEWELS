import { Router } from "express";
import { subscribeNewsletter, unsubscribeNewsletter, getSubscribers } from "../controllers/newsletterController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public: subscribe and unsubscribe
router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);

// Admin only: get all subscribers
router.get("/", authMiddleware, adminMiddleware, getSubscribers);

export default router;
