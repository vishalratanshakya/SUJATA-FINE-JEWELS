import { AboutStory, IAboutStory } from "../models/AboutStory";

export const aboutService = {
  getAboutStory: async (): Promise<IAboutStory> => {
    let story = await AboutStory.findOne();
    if (!story) {
      // Create default if none exists
      story = await AboutStory.create({});
    }
    return story;
  },

  updateAboutStory: async (data: Partial<IAboutStory>): Promise<IAboutStory> => {
    let story = await AboutStory.findOne();
    if (!story) {
      story = await AboutStory.create(data);
    } else {
      story = await AboutStory.findOneAndUpdate({}, data, { new: true }) as IAboutStory;
    }
    return story;
  }
};
