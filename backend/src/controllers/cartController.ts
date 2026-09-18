import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { getCartData, addItemToCart, removeItemFromCart, clearUserCart } from "../services/cartService";

export const getCart = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await getCartData(userId);
  sendResponse(res, 200, true, "Cart retrieved successfully", cart);
});

export const addToCart = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await addItemToCart(userId, req.body);
  sendResponse(res, 200, true, "Item added to cart", cart);
});

export const removeFromCart = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const cart = await removeItemFromCart(userId, productId);
  sendResponse(res, 200, true, "Item removed from cart", cart);
});

export const clearCart = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const cart = await clearUserCart(userId);
  sendResponse(res, 200, true, "Cart cleared successfully", cart);
});
