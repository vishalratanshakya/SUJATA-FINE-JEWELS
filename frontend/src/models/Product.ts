import mongoose, { Schema, Document } from "mongoose";

export interface IProductDoc extends Document {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  primaryImage?: string;
  hoverImage?: string;
  galleryImages?: string[];
  videoUrl?: string;
  model3DUrl?: string;
  description: string;
  metal: string;
  purity?: string;
  grossWeight?: string;
  netWeight?: string;
  stone?: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isExploreCollection?: boolean;
  isSignatureCarousel?: boolean;
  isBridalWedding?: boolean;
  isLuxuryGifting?: boolean;
  isBehindTheCraft?: boolean;
  isVerifiedReviews?: boolean;
  isDealOfTheDay?: boolean;
  isShopByOccasion?: boolean;
  stock: number;
  availableSizes?: string[];
  sizeStock?: Record<string, number>;
  necklaceLength?: string[];
  earringType?: string;
  earringPairType?: string;
  pendantOptions?: string[];
  occasions?: string[];
  productDetails?: string;
  diamondInfo?: string;
  shippingReturns?: string;
  careInstructions?: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String, required: true }],
    primaryImage: { type: String },
    hoverImage: { type: String },
    galleryImages: [{ type: String }],
    videoUrl: { type: String },
    model3DUrl: { type: String },
    description: { type: String, default: "Exquisite handcrafted fine jewellery piece from SUJATA Fine Jewels." },
    metal: { type: String, required: true },
    purity: { type: String, default: "750 (18K)" },
    grossWeight: { type: String },
    netWeight: { type: String },
    stone: { type: String },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isExploreCollection: { type: Boolean, default: false },
    isSignatureCarousel: { type: Boolean, default: false },
    isBridalWedding: { type: Boolean, default: false },
    isLuxuryGifting: { type: Boolean, default: false },
    isBehindTheCraft: { type: Boolean, default: false },
    isVerifiedReviews: { type: Boolean, default: false },
    isDealOfTheDay: { type: Boolean, default: false },
    isShopByOccasion: { type: Boolean, default: false },
    stock: { type: Number, default: 10 },
    availableSizes: [{ type: String }],
    sizeStock: { type: Map, of: Number },
    necklaceLength: [{ type: String }],
    earringType: { type: String },
    earringPairType: { type: String },
    pendantOptions: [{ type: String }],
    occasions: [{ type: String }],
    productDetails: { type: String },
    diamondInfo: { type: String },
    shippingReturns: { type: String },
    careInstructions: { type: String },
  },
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<IProductDoc>("Product", ProductSchema);
