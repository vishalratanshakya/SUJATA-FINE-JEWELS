import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { createOrder, getUserOrders, getOrderDetails } from "../services/orderService";
import { Order } from "../models/Order";

export const placeOrder = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const order = await createOrder(userId, req.body);
    
    const io = req.app.get("io");
    if (io) {
      io.to("admin_room").emit("new_order", {
        message: `New order #${order.orderId} placed by ${order.customerName}`,
        order: order
      });
    }

    sendResponse(res, 201, true, "Order placed successfully", order);
  } catch (error: any) {
    if (error.message === "User not found") {
      return sendResponse(res, 404, false, error.message);
    }
    if (error.message === "Order must have at least one item") {
      return sendResponse(res, 400, false, error.message);
    }
    throw error;
  }
});

export const getMyOrders = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const orders = await getUserOrders(userId);
  sendResponse(res, 200, true, "Orders retrieved", orders);
});

export const getOrderById = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const order = await getOrderDetails(userId, id);
    sendResponse(res, 200, true, "Order retrieved", order);
  } catch (error: any) {
    if (error.message === "Order not found") {
      return sendResponse(res, 404, false, error.message);
    }
    throw error;
  }
});

// ─── Admin Endpoints ─────────────────────────────────────────────────────────

// GET /api/orders/admin/all — Admin: get all orders
export const getAllOrdersAdmin = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  sendResponse(res, 200, true, "All orders retrieved", orders);
});

// GET /api/orders/admin/:id — Admin: get single order detail
export const getOrderByIdAdmin = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return sendResponse(res, 404, false, "Order not found");
  sendResponse(res, 200, true, "Order retrieved", order);
});

// PATCH /api/orders/admin/:id/status — Admin: update order status
export const updateOrderStatusAdmin = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  const { status, trackingId } = req.body;

  const validStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status?.toUpperCase())) {
    return sendResponse(res, 400, false, "Invalid status value");
  }

  const updateData: any = { status: status.toUpperCase() };
  if (trackingId) updateData.trackingId = trackingId;

  const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) return sendResponse(res, 404, false, "Order not found");

  sendResponse(res, 200, true, "Order status updated", order);
});
