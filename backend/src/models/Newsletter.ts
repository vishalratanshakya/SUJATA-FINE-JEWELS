import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
