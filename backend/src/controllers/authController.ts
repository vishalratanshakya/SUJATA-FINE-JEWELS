import { Request, Response } from "express";
import { googleLogin } from "../services/authService";

export async function googleAuthCallback(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const result = await googleLogin(token);
    return res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
}
