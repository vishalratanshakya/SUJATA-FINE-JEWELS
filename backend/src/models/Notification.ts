import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, default: "ORDER" },
  },
  { timestamps: true }
);

export const Notification = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
