import mongoose, { Schema, Document } from "mongoose";

export interface ICraftStory extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  linkedProducts: string[];
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CraftStorySchema = new Schema<ICraftStory>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    linkedProducts: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CraftStory = mongoose.models.CraftStory || mongoose.model<ICraftStory>("CraftStory", CraftStorySchema);
