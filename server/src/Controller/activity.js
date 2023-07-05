import Activity from "../Models/activity.js";
import { createResult } from "../Utils/utility.js";
import { ActivityValidate } from "../Middleware/validate.js";

export const ActivityRoot = {
  createActivity: async ({ input }) => {
    try {
      const { error } = ActivityValidate.validate(input);
      if (error) throw new Error(error.details[0].message);
      const activity = new Activity(input);
      await activity.save();
      return createResult({
        data: activity,
        message: "Activity created successfully",
        status: 201,
      });
    } catch (error) {
      throw error || "Failed to create activity";
    }
  },
  updateActivity: async ({ input }) => {
    try {
      const { error } = ActivityValidate.validate(input);
      if (error) throw new Error(error.details[0].message);

      const { id, ...rest } = input;
      const data = {
        ...rest,
        is_edited: true,
      };

      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        {
          $set: { ...data },
        },
        { new: true }
      );

      return createResult({
        data: updatedActivity,
        message: "Activity updated successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to create activity";
    }
  },

  getAllActivity: async ({ input }) => {
    try {
      const transactions = await Activity.find({ user_id: input.id })
        .sort({ createdAt: -1 })
        .limit(input.count || 10000);

      return createResult({
        data: transactions,
        message: "Activity fetched successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to fetch transaction";
    }
  },
};
