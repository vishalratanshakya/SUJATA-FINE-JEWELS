import mongoose, { Schema, Document } from "mongoose";

export interface IAboutStory extends Document {
  heroImage: string;
  eyebrow: string;
  mainHeading: string;
  storyContent: string;
  philosophyHeading: string;
  philosophyContent: string;
  craftsmanshipHeading: string;
  craftsmanshipContent: string;
  materialsHeading: string;
  materialsContent: string;
  editorialImage1: string;
  editorialImage2: string;
  editorialImage3: string;
  founderName: string;
  founderStory: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutStorySchema = new Schema<IAboutStory>(
  {
    heroImage: { type: String, default: "/images/editorial/about_hero.jpg" },
    eyebrow: { type: String, default: "OUR STORY" },
    mainHeading: { type: String, default: "Sujata Fine Jewels" },
    storyContent: { type: String, default: "Sujata Fine Jewels embodies the pinnacle of luxury, blending traditional artistry with modern elegance. Each piece is a testament to our commitment to exceptional craftsmanship and timeless design." },
    philosophyHeading: { type: String, default: "Our Philosophy" },
    philosophyContent: { type: String, default: "We believe in creating more than just jewellery; we craft heirlooms that carry stories across generations." },
    craftsmanshipHeading: { type: String, default: "Artisanal Craftsmanship" },
    craftsmanshipContent: { type: String, default: "Every jewel is meticulously handcrafted by master artisans who have perfected their trade over decades." },
    materialsHeading: { type: String, default: "Finest Materials" },
    materialsContent: { type: String, default: "We ethically source the most brilliant natural diamonds and craft in solid 18K gold to ensure everlasting brilliance." },
    editorialImage1: { type: String, default: "/images/editorial/editorial_1.jpg" },
    editorialImage2: { type: String, default: "/images/editorial/editorial_2.jpg" },
    editorialImage3: { type: String, default: "/images/editorial/editorial_3.jpg" },
    founderName: { type: String, default: "Founder & Creative Director" },
    founderStory: { type: String, default: "Our journey began with a vision to redefine luxury fine jewellery for the modern connoisseur." },
  },
  { timestamps: true }
);

export const AboutStory = mongoose.models.AboutStory || mongoose.model<IAboutStory>("AboutStory", AboutStorySchema);
