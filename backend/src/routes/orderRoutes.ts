import { Router } from "express";
import { placeOrder, getMyOrders, getOrderById } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", placeOrder);
router.get("/my-orders", getMyOrders);
router.get("/:id", getOrderById);

export default router;
