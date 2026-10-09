import { Router } from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrdersAdmin,
  getOrderByIdAdmin,
  updateOrderStatusAdmin,
} from "../controllers/orderController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// User routes (auth required)
router.post("/", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);

// Admin routes (auth + admin role required)
router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrdersAdmin);
router.get("/admin/:id", authMiddleware, adminMiddleware, getOrderByIdAdmin);
router.patch("/admin/:id/status", authMiddleware, adminMiddleware, updateOrderStatusAdmin);

export default router;
