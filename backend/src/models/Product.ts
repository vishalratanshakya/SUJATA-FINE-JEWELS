import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  category: string;
  collectionName?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  primaryImage?: string;
  hoverImage?: string;
  galleryImages?: string[];
  description: string;
  metal: string;
  purity?: string;
  grossWeight?: string;
  netWeight?: string;
  stone?: string;
  diamondColor?: string;
  diamondClarity?: string;
  isNewArrival: boolean;
  isBestseller: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
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
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    collectionName: { type: String, default: "Timeless" },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPercentage: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    primaryImage: { type: String },
    hoverImage: { type: String },
    galleryImages: [{ type: String }],
    description: { type: String, default: "Exquisite handcrafted fine jewellery piece from SUJATA Fine Jewels." },
    metal: { type: String, required: true },
    purity: { type: String, default: "750 (18K)" },
    grossWeight: { type: String },
    netWeight: { type: String },
    stone: { type: String },
    diamondColor: { type: String, default: "VVS-VS / E-F" },
    diamondClarity: { type: String, default: "VVS" },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
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

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
