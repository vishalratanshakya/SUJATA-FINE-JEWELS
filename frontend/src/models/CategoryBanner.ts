import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryBanner extends Document {
  name: string; // Internal name, e.g., "Rings Banner"
  targetSlug: string; // e.g., "catalogue", "rings", "necklaces", "wedding"
  eyebrow: string;
  title: string;
  description: string;
  bannerImage: string;
  bannerVideo: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategoryBannerSchema = new Schema<ICategoryBanner>(
  {
    name: { type: String, required: true },
    targetSlug: { type: String, required: true, unique: true },
    eyebrow: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    bannerVideo: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CategoryBannerModel = mongoose.models.CategoryBanner || mongoose.model<ICategoryBanner>("CategoryBanner", CategoryBannerSchema);
