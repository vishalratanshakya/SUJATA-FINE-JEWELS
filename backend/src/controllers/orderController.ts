import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { createOrder, getUserOrders, getOrderDetails } from "../services/orderService";

export const placeOrder = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const order = await createOrder(userId, req.body);
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
