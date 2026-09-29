import { Request, Response } from "express";
import { GiftingCollection } from "../models/GiftingCollection";

export async function getGiftingCollections(req: Request, res: Response) {
  try {
    const filter: any = {};
    if (req.query.publishedOnly === "true") {
      filter.isActive = true;
    }

    const collections = await GiftingCollection.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 });
    
    res.json({ success: true, count: collections.length, data: collections });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getGiftingCollectionBySlug(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string;
    const collection = await GiftingCollection.findOne({ slug });
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, data: collection });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createGiftingCollection(req: Request, res: Response) {
  try {
    const collection = await GiftingCollection.create(req.body);
    res.status(201).json({ success: true, data: collection });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateGiftingCollection(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const collection = await GiftingCollection.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, data: collection });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteGiftingCollection(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const collection = await GiftingCollection.findByIdAndDelete(id);
    
    if (!collection) return res.status(404).json({ success: false, message: "Collection not found" });
    
    res.json({ success: true, message: "Collection deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
