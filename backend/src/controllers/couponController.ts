import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { Coupon } from "../models/Coupon";

// POST /api/coupons/validate — Public: validate a coupon code
export const validateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code, orderAmount } = req.body;

  if (!code) return sendResponse(res, 400, false, "Coupon code is required");

  const coupon = await Coupon.findOne({ code: code.toUpperCase().trim(), isActive: true });
  if (!coupon) return sendResponse(res, 404, false, "Invalid or expired coupon code");

  // Check expiry
  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return sendResponse(res, 400, false, "This coupon has expired");
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return sendResponse(res, 400, false, "This coupon has reached its usage limit");
  }

  // Check min order amount
  if (orderAmount < coupon.minOrderAmount) {
    return sendResponse(res, 400, false, `Minimum order amount of ₹${coupon.minOrderAmount.toLocaleString()} required for this coupon`);
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = Math.round((orderAmount * coupon.discountValue) / 100);
    if (coupon.maxDiscount) discountAmount = Math.min(discountAmount, coupon.maxDiscount);
  } else {
    discountAmount = Math.min(coupon.discountValue, orderAmount);
  }

  sendResponse(res, 200, true, "Coupon applied successfully!", {
    code: coupon.code,
    description: coupon.description,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmount,
    finalAmount: orderAmount - discountAmount,
  });
});

// GET /api/coupons — Public: list all active coupons
export const getActiveCoupons = asyncHandler(async (req: Request, res: Response) => {
  const coupons = await Coupon.find({ isActive: true }).sort({ createdAt: -1 });
  sendResponse(res, 200, true, "Active coupons retrieved", coupons);
});

// GET /api/coupons/admin — Admin: list all coupons
export const getAllCoupons = asyncHandler(async (req: Request, res: Response) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  sendResponse(res, 200, true, "All coupons retrieved", coupons);
});

// POST /api/coupons — Admin: create a coupon
export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code, description, discountType, discountValue, minOrderAmount, maxDiscount, expiresAt, usageLimit } = req.body;
  if (!code || !discountType || !discountValue) {
    return sendResponse(res, 400, false, "Code, discountType, and discountValue are required");
  }
  const existing = await Coupon.findOne({ code: code.toUpperCase().trim() });
  if (existing) return sendResponse(res, 400, false, "A coupon with this code already exists");

  const coupon = await Coupon.create({ code, description, discountType, discountValue, minOrderAmount, maxDiscount, expiresAt, usageLimit });
  sendResponse(res, 201, true, "Coupon created", coupon);
});

// PUT /api/coupons/:id — Admin: update a coupon
export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
  if (!coupon) return sendResponse(res, 404, false, "Coupon not found");
  sendResponse(res, 200, true, "Coupon updated", coupon);
});

// DELETE /api/coupons/:id — Admin: delete a coupon
export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) return sendResponse(res, 404, false, "Coupon not found");
  sendResponse(res, 200, true, "Coupon deleted");
});
