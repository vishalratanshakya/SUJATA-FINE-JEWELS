import mongoose, { Schema, Document } from "mongoose";

export interface IGiftingCollection extends Document {
  occasion: string; // "Birthday", "Anniversary", "Wedding", "Festive"
  bannerImage: string;
  title: string;
  description: string;
  slug: string;
  displayOrder: number;
  products: string[]; // Array of product IDs
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GiftingCollectionSchema = new Schema<IGiftingCollection>(
  {
    occasion: { type: String, required: true, enum: ["Birthday", "Anniversary", "Wedding", "Festive"] },
    bannerImage: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    displayOrder: { type: Number, default: 0 },
    products: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GiftingCollection = mongoose.models.GiftingCollection || mongoose.model<IGiftingCollection>("GiftingCollection", GiftingCollectionSchema);
