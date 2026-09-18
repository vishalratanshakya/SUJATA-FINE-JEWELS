import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { getWishlistData, toggleProductInWishlist } from "../services/wishlistService";

export const getWishlist = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const wishlist = await getWishlistData(userId);
  sendResponse(res, 200, true, "Wishlist retrieved", wishlist);
});

export const toggleWishlist = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const wishlist = await toggleProductInWishlist(userId, productId);
  sendResponse(res, 200, true, "Wishlist updated", wishlist);
});
