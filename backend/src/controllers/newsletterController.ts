import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { Newsletter } from "../models/Newsletter";

// POST /api/newsletter/subscribe — Subscribe an email
export const subscribeNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return sendResponse(res, 400, false, "Email address is required");
  }

  // Check if already subscribed
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    if (existing.isActive) {
      return sendResponse(res, 200, true, "You are already subscribed to our newsletter!", existing);
    } else {
      // Reactivate if previously unsubscribed
      existing.isActive = true;
      await existing.save();
      return sendResponse(res, 200, true, "Welcome back! You have been re-subscribed to our newsletter.", existing);
    }
  }

  const subscriber = await Newsletter.create({ email });
  sendResponse(res, 201, true, "Thank you for subscribing to Sujata Fine Jewels newsletter!", subscriber);
});

// POST /api/newsletter/unsubscribe — Unsubscribe an email
export const unsubscribeNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return sendResponse(res, 400, false, "Email address is required");
  }

  const subscriber = await Newsletter.findOneAndUpdate(
    { email },
    { isActive: false },
    { new: true }
  );

  if (!subscriber) {
    return sendResponse(res, 404, false, "Email not found in our subscription list");
  }

  sendResponse(res, 200, true, "You have been unsubscribed successfully.", subscriber);
});

// GET /api/newsletter — Admin: Get all subscribers
export const getSubscribers = asyncHandler(async (req: Request, res: Response) => {
  const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
  sendResponse(res, 200, true, "Subscribers retrieved", subscribers);
});
