import Settings from "../Models/settings.js";
import { createResult } from "../Utils/utility.js";

export const SettingRoot = {
  createSetting: async ({ id }) => {
    try {
      const newSetting = new Settings({ user_id: id });
      await newSetting.save();
    } catch (error) {
      throw error || "Failed to create Settings";
    }
  },
  updateSetting: async ({ input }) => {
    const { user_id, ...rest } = input;
    try {
      const updatedSetting = await Settings.findOneAndUpdate(
        { user_id },
        { ...rest },
        { new: true }
      );

      if (!updatedSetting) throw new Error("User id is wrong");

      return createResult({
        data: updatedSetting,
        message: "Setting updated Successfully",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      throw error || "Failed to update Settings";
    }
  },
  getUserSetting: async ({ id }) => {
    try {
      const setting = await Settings.findOne({ user_id: id });

      return createResult({
        data: setting,
        message: "Setting fetched Successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to fetch Settings";
    }
  },
};
