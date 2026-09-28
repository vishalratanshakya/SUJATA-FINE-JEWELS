import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncementBar extends Document {
  message: string;
  linkText: string;
  linkUrl: string;
  bgColor: string;
  textColor: string;
  active: boolean;
}

const announcementBarSchema = new Schema(
  {
    message: { type: String, required: true },
    linkText: { type: String, default: "" },
    linkUrl: { type: String, default: "" },
    bgColor: { type: String, default: "#1a1a1a" },
    textColor: { type: String, default: "#ffffff" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AnnouncementBar = mongoose.model<IAnnouncementBar>('AnnouncementBar', announcementBarSchema);
