import { Request, Response } from "express";
import { aboutService } from "../services/aboutService";

export async function getAboutStory(req: Request, res: Response) {
  try {
    const story = await aboutService.getAboutStory();
    res.json({ success: true, data: story });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateAboutStory(req: Request, res: Response) {
  try {
    const story = await aboutService.updateAboutStory(req.body);
    res.json({ success: true, data: story });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}
