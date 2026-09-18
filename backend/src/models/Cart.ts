import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: string;
  quantity: number;
  selectedMetal?: string;
  selectedSize?: string;
  price: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        selectedMetal: { type: String },
        selectedSize: { type: String },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
