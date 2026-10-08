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

import jwt from 'jsonwebtoken';

export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Strictly validate against admin credentials from environment variables
    if (email === adminEmail && password === adminPassword) {
      const jwtSecret = process.env.JWT_SECRET || 'sujata_fine_jewels_secret_jwt_key_2026';
      const authToken = jwt.sign(
        { id: 'admin123', email: adminEmail, role: 'admin', name: 'Super Admin' },
        jwtSecret,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        token: authToken,
        user: { id: 'admin123', name: 'Super Admin', email: adminEmail, role: 'admin' }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
