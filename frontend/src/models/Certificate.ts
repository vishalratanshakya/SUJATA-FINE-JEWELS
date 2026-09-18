import mongoose, { Schema, Document } from "mongoose";

export interface ICertificateDoc extends Document {
  certId: string;
  orderId: string;
  productId: string;
  customerId: string;
  customerName: string;
  productName: string;
  productImage: string;
  jewelleryType: string;
  metalType: string;
  metalPurity: string;
  grossWeight: string;
  netWeight: string;
  gemstoneDetails: string;
  sku: string;
  purchaseDate: string;
  certificationDate: string;
  status: "Pending" | "Generated" | "Issued" | "Revoked";
}

const CertificateSchema = new Schema<ICertificateDoc>(
  {
    certId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    jewelleryType: { type: String, required: true },
    metalType: { type: String, required: true },
    metalPurity: { type: String, default: "750" },
    grossWeight: { type: String, required: true },
    netWeight: { type: String, required: true },
    gemstoneDetails: { type: String, required: true },
    sku: { type: String, required: true },
    purchaseDate: { type: String, required: true },
    certificationDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Generated", "Issued", "Revoked"],
      default: "Issued",
    },
  },
  { timestamps: true }
);

export const CertificateModel =
  mongoose.models.Certificate ||
  mongoose.model<ICertificateDoc>("Certificate", CertificateSchema);
