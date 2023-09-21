import Settings from "../Models/settings.js";
import { createResult, validateJwtToken } from "../Utils/utility.js";
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
    try {
      await validateJwtToken(input.token, input.user_id);
      await deleteRedisKey(input.user_id);
      const { user_id, ...rest } = input;
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
  getUserSetting: async ({ input }) => {
    try {
      // await validateJwtToken(input.token, input.id);
      const cacheSetting = await getRedisCache(`${input.id}setting`);

      if (cacheSetting) {
        return createResult({
          data: cacheSetting,
          message: "Setting fetched Successfully",
          status: 200,
        });
      } else {
        const setting = await Settings.findOne({ user_id: input.id });
        await setRedisCache(`${input.id}setting`, setting);
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
