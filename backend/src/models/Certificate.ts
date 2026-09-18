import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  certificateId: string;
  orderId: string;
  productName: string;
  metalPurity: string;
  grossWeight: string;
  netWeight: string;
  diamondDetails: string;
  issueDate: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    productName: { type: String, required: true },
    metalPurity: { type: String, required: true },
    grossWeight: { type: String, required: true },
    netWeight: { type: String, required: true },
    diamondDetails: { type: String, required: true },
    issueDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const Certificate = mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
