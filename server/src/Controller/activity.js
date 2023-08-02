import Activity from "../Models/activity.js";
import { createResult } from "../Utils/utility.js";
import { ActivityValidate } from "../Middleware/validate.js";

export const ActivityRoot = {
  createActivity: async ({ input }) => {
    try {
      const { error } = ActivityValidate.validate(input);
      if (error) throw new Error(error.details[0].message);
      if (input.type_name === "refund" && input.name.trim().length <= 2)
        throw new Error("Refund name is required");

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
      let query = {
        user_id: input.id,
        createdAt: { $gte: input.date },
      };

      if (input.type !== "all") {
        query.type_name = input.type;
      }

      const transactions = await Activity.find(query).sort({ createdAt: -1 });
      return createResult({
        data: transactions,
        message: "Activity fetched successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to fetch transaction";
    }
  },

  getPaginatedActivity: async ({ input }) => {
    try {
      const { pageSize, pageNumber, type, search } = input;
      const skipDocuments = (+pageNumber - 1) * +pageSize;
      const regex = new RegExp(search.toLowerCase(), "i");

      const queryType =
        type === "all"
          ? null
          : {
              type_name: type,
            };

      const totalProduct = (await Activity.find(queryType)).length;
      const transactions = await Activity.find({
        ...queryType,
        name: { $regex: regex },
      })
        .skip(skipDocuments)
        .limit(+pageSize)
        .sort({ createdAt: -1 });

      return {
        data: transactions,
        total: totalProduct,
        message: "Activity fetched successfully",
        status: 200,
      };
    } catch (error) {
      throw error || "Failed to fetch transaction";
    }
  },
};
