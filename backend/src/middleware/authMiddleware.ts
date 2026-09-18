import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  
  try {
    const jwtSecret = process.env.JWT_SECRET || "sujata_fine_jewels_secret_jwt_key_2026";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export function adminMiddleware(req: any, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin" && req.user?.role !== "superadmin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
}
