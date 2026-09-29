import { Request, Response } from "express";
import { BridalCollection } from "../models/BridalCollection";

export async function getBridalCollections(req: Request, res: Response) {
  try {
    const filter: any = {};
    // Public routes only show active collections unless admin
    if (req.query.publishedOnly === "true") {
      filter.isActive = true;
    }

    const collections = await BridalCollection.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 });
    
    res.json({ success: true, count: collections.length, data: collections });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getBridalCollectionBySlug(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string;
    const collection = await BridalCollection.findOne({ slug });
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, data: collection });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createBridalCollection(req: Request, res: Response) {
  try {
    const collection = await BridalCollection.create(req.body);
    res.status(201).json({ success: true, data: collection });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateBridalCollection(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const collection = await BridalCollection.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, data: collection });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteBridalCollection(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const collection = await BridalCollection.findByIdAndDelete(id);
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, message: "Collection deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
