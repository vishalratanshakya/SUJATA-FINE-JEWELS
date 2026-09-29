import { Request, Response } from "express";
import { Review } from "../models/Review";

export async function getReviews(req: Request, res: Response) {
  try {
    const filter: any = {};
    if (req.query.approvedOnly === "true") {
      filter.isApproved = true;
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createReview(req: Request, res: Response) {
  try {
    // Note: Publicly created reviews are not approved by default
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    
    res.json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const review = await Review.findByIdAndDelete(id);
    
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
