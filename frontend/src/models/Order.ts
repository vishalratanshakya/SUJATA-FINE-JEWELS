import mongoose, { Schema, Document } from "mongoose";

export interface IOrderDoc extends Document {
  orderId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalAmount: number;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shippingAddress: {
    title: string;
    name: string;
    line1: string;
    line2?: string;
    phone: string;
  };
  createdAt: Date;
}

const OrderSchema = new Schema<IOrderDoc>(
  {
    orderId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "DELIVERED",
    },
    shippingAddress: {
      title: { type: String, default: "HOME" },
      name: { type: String, required: true },
      line1: { type: String, required: true },
      line2: { type: String },
      phone: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<IOrderDoc>("Order", OrderSchema);
