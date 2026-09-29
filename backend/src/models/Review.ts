import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  displayName: string;
  rating: number;
  reviewText: string;
  mediaUrl?: string; // photo or video
  productId?: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    displayName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    mediaUrl: { type: String },
    productId: { type: String },
    isVerifiedPurchase: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    orderId: { type: String },
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
