import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  code: string;
  slug: string;
  itemCount: number;
  active: boolean;
  image?: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  itemCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
