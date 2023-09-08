import Settings from "../Models/settings.js";
import { createResult } from "../Utils/utility.js";
import {
  getRedisCache,
  deleteRedisKey,
  setRedisCache,
} from "../Utils/redis.js";

export const SettingRoot = {
  createSetting: async ({ id }) => {
    try {
      const newSetting = new Settings({ user_id: id });
      await newSetting.save();
      await deleteRedisKey(`${newSetting.user_id}setting`);
    } catch (error) {
      throw error || "Failed to create Settings";
    }
  },

  updateSetting: async ({ input }) => {
    await deleteRedisKey(input.user_id);
    const { user_id, ...rest } = input;
    try {
      const updatedSetting = await Settings.findOneAndUpdate(
        { user_id },
        { ...rest },
        { new: true }
      );

      if (!updatedSetting) throw new Error("User id is wrong");
      await deleteRedisKey(`${updatedSetting.user_id}setting`);

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
      const cacheSetting = await getRedisCache(`${id}setting`);

      if (cacheSetting) {
        return createResult({
          data: cacheSetting,
          message: "Setting fetched Successfully",
          status: 200,
        });
      } else {
        const setting = await Settings.findOne({ user_id: id });
        await setRedisCache(`${id}setting`, setting);
        return createResult({
          data: setting,
          message: "Setting fetched Successfully",
          status: 200,
        });
      }
    } catch (error) {
      throw error || "Failed to fetch Settings";
    }
  },
};
