import { Request, Response } from "express";
import { AnnouncementBar } from "../models/AnnouncementBar";

export const getAnnouncementBar = async (req: Request, res: Response) => {
  try {
    let bar = await AnnouncementBar.findOne();
    if (!bar) {
      bar = await AnnouncementBar.create({
        message: "Welcome to Sujata Fine Jewels - Enjoy free shipping on all orders",
        linkText: "Shop Now",
        linkUrl: "/shop",
        bgColor: "#1a1a1a",
        textColor: "#ffffff",
        active: true
      });
    }
    res.json({ success: true, data: bar });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const updateAnnouncementBar = async (req: Request, res: Response) => {
  try {
    let bar = await AnnouncementBar.findOne();
    if (bar) {
      bar = await AnnouncementBar.findByIdAndUpdate(bar._id, req.body, { new: true });
    } else {
      bar = await AnnouncementBar.create(req.body);
    }
    res.json({ success: true, data: bar });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
