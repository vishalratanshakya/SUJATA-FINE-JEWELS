import mongoose, { Document, Schema } from "mongoose";

export interface IHeroBanner extends Document {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  ctaUrl: string;
  image: string;
  active: boolean;
}

const heroBannerSchema = new Schema(
  {
    id: { type: Number, required: true },
    eyebrow: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
    ctaUrl: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const HeroBanner = mongoose.model<IHeroBanner>("HeroBanner", heroBannerSchema);
