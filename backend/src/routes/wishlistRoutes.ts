import { Router } from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getWishlist);
router.post("/:productId", authMiddleware, toggleWishlist);

export default router;
