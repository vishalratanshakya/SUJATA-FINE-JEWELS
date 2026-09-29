import { Router } from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getReviews);
router.post("/", createReview); // Public users can post reviews
router.put("/:id", authMiddleware, adminMiddleware, updateReview); // Only admins can approve/update
router.delete("/:id", authMiddleware, adminMiddleware, deleteReview);

export default router;
