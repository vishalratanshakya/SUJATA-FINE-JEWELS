import { Router } from "express";
import { validateCoupon, getActiveCoupons, getAllCoupons, createCoupon, updateCoupon, deleteCoupon } from "../controllers/couponController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public
router.get("/", getActiveCoupons);
router.post("/validate", validateCoupon);

// Admin
router.get("/admin/all", authMiddleware, adminMiddleware, getAllCoupons);
router.post("/", authMiddleware, adminMiddleware, createCoupon);
router.put("/:id", authMiddleware, adminMiddleware, updateCoupon);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCoupon);

export default router;
