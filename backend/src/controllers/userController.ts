import { Request, Response } from "express";
import { getProfile, updateProfileInfo } from "../services/userService";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await getProfile(userId);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error("Get Me Error:", error);
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await updateProfileInfo(userId, req.body);
    res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
