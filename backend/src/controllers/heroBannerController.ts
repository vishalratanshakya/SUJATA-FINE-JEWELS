import { Request, Response } from "express";
import { HeroBanner } from "../models/HeroBanner";

export const getHeroBanners = async (req: Request, res: Response) => {
  try {
    const banners = await HeroBanner.find().sort({ id: 1 });
    res.json({ success: true, data: banners });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const createHeroBanner = async (req: Request, res: Response) => {
  try {
    const banner = new HeroBanner(req.body);
    await banner.save();
    res.status(201).json({ success: true, data: banner });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const updateHeroBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await HeroBanner.findOneAndUpdate({ id: Number(id) }, req.body, { new: true });
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });
    res.json({ success: true, data: banner });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteHeroBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await HeroBanner.findOneAndDelete({ id: Number(id) });
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });
    res.json({ success: true, message: "Banner deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const reorderHeroBanners = async (req: Request, res: Response) => {
  try {
    const { banners } = req.body; // Array of banners in new order
    
    // Simple approach: Delete all and re-insert, or update each. Updating is safer.
    for (const banner of banners) {
      await HeroBanner.findOneAndUpdate({ id: banner.id }, banner, { upsert: true });
    }
    
    const updatedBanners = await HeroBanner.find().sort({ id: 1 });
    res.json({ success: true, data: updatedBanners });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
