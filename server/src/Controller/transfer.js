import Transfer from "../Models/Transfer.js";
import { createResult } from "../Utils/utility.js";
import { TransferValidate } from "../Middleware/validate.js";
import {
  deleteRedisKey,
  setRedisCache,
  getRedisCache,
} from "../Utils/redis.js";

export const TransferRoot = {
  createTransfer: async ({ input }) => {
    try {
      const { error } = TransferValidate.validate(input);
      if (error) throw new Error(error.details[0].message);

      const newTransfer = new Transfer(input);
      await newTransfer.save();
      await deleteRedisKey(`${input.user_id}transfer`);
      return createResult({
        data: newTransfer,
        message: "Payment created successfully",
        status: 201,
      });
    } catch (error) {
      throw error || "Failed to create payment";
    }
  },

  getTransferAll: async ({ id }) => {
    try {
      const cachePayments = await getRedisCache(`${id}transfer`);

      if (cachePayments) {
        return createResult({
          data: cachePayments,
          message: "Payment fetched successfully",
          status: 200,
        });
      } else {
        const payments = await Transfer.find({ user_id: id }).sort({
          createdAt: -1,
        });
        await setRedisCache(`${id}transfer`, payments);

        return createResult({
          data: payments,
          message: "Payment fetched successfully",
          status: 200,
        });
      }
    } catch (error) {
      throw error || "Failed to fetch payment";
    }
  },

  deleteTransfer: async ({ id }) => {
    try {
      const payment = await Transfer.findByIdAndDelete(id);
      await deleteRedisKey(`${payment.user_id}transfer`);
      return createResult({
        message: "Payment deleted successfully",
        status: 200,
        data: payment,
      });
    } catch (error) {
      throw error || "Failed to delete payment";
    }
  },
};
