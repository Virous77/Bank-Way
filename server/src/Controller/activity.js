import Activity from "../Models/activity.js";
import { createResult } from "../Utils/utility.js";
import { ActivityValidate } from "../Middleware/validate.js";
import {
  deleteRedisKey,
  setRedisCache,
  getRedisCache,
} from "../Utils/redis.js";

export const ActivityRoot = {
  createActivity: async ({ input }) => {
    try {
      const { error } = ActivityValidate.validate(input);
      if (error) throw new Error(error.details[0].message);
      if (input.type_name === "refund" && input.name.trim().length <= 2)
        throw new Error("Refund name is required");

      const activity = new Activity(input);
      await deleteRedisKey(input.user_id);
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

      const { _id, ...rest } = input;
      const data = {
        ...rest,
        is_edited: true,
      };

      const updatedActivity = await Activity.findByIdAndUpdate(
        _id,
        {
          $set: { ...data },
        },
        { new: true }
      );
      await deleteRedisKey(input.user_id);
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

      const cacheTransactions = await getRedisCache(input.id);

      if (cacheTransactions) {
        return createResult({
          data: cacheTransactions,
          message: "Activity fetched successfully",
          status: 200,
        });
      } else {
        const transactions = await Activity.find(query).sort({
          createdAt: -1,
        });
        await setRedisCache(input.id, transactions);
        return createResult({
          data: transactions,
          message: "Activity fetched successfully",
          status: 200,
        });
      }
    } catch (error) {
      throw error || "Failed to fetch transaction";
    }
  },

  getPaginatedActivity: async ({ input }) => {
    try {
      const { pageSize, pageNumber, type, search, user_id } = input;
      const skipDocuments = (+pageNumber - 1) * +pageSize;
      const regex = new RegExp(search.toLowerCase(), "i");

      const queryType =
        type === "all"
          ? null
          : {
              type_name: type,
            };

      const totalProduct = (
        await Activity.find({ ...queryType, user_id: user_id })
      ).length;
      const transactions = await Activity.find({
        user_id: user_id,
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
