import mongoose, { Schema, Document } from "mongoose";

export interface IBridalCollection extends Document {
  name: string;
  description: string;
  coverImage: string;
  products: string[]; // Array of product IDs
  slug: string;
  banner: string;
  displayOrder: number;
  isFeatured: boolean;
  shopTheLookGroups: { groupName: string; products: string[] }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BridalCollectionSchema = new Schema<IBridalCollection>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    products: [{ type: String }],
    slug: { type: String, required: true, unique: true },
    banner: { type: String },
    displayOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    shopTheLookGroups: [
      {
        groupName: { type: String },
        products: [{ type: String }],
      }
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BridalCollection = mongoose.models.BridalCollection || mongoose.model<IBridalCollection>("BridalCollection", BridalCollectionSchema);
