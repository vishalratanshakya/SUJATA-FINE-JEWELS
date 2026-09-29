import { Request, Response } from "express";
import { CraftStory } from "../models/CraftStory";

export async function getCraftStories(req: Request, res: Response) {
  try {
    const filter: any = {};
    if (req.query.publishedOnly === "true") {
      filter.isActive = true;
    }

    const stories = await CraftStory.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, count: stories.length, data: stories });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createCraftStory(req: Request, res: Response) {
  try {
    const story = await CraftStory.create(req.body);
    res.status(201).json({ success: true, data: story });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateCraftStory(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const story = await CraftStory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    
    res.json({ success: true, data: story });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteCraftStory(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const story = await CraftStory.findByIdAndDelete(id);
    
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    
    res.json({ success: true, message: "Story deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
