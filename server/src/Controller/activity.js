import Activity from "../Models/activity.js";
import { createResult } from "../Utils/utility.js";

export const ActivityRoot = {
  createActivity: async ({ input }) => {
    console.log(input);

    // try {
    //   const activity = new Activity(input);
    //   await activity.save();

    //   return createResult({
    //     data: activity,
    //     message: "Activity created successfully",
    //     status: 201,
    //   });
    // } catch (error) {
    //   throw error || "Failed to create activity";
    // }
  },
};
