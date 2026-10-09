import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Notification } from "../models/Notification";
import { sendResponse } from "../utils/sendResponse";

// Get user notifications
export const getMyNotifications = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
  sendResponse(res, 200, true, "Notifications retrieved", notifications);
});

// Mark single notification as read
export const markAsRead = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;
  const notification = await Notification.findOneAndUpdate(
    { _id: id, userId },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new Error("Notification not found");
  sendResponse(res, 200, true, "Notification marked as read", notification);
});

// Mark all notifications as read
export const markAllAsRead = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  sendResponse(res, 200, true, "All notifications marked as read");
});
