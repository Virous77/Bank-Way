import Transfer from "../Models/Transfer.js";
import { createResult } from "../Utils/utility.js";
import { TransferValidate } from "../Middleware/validate.js";

export const TransferRoot = {
  createTransfer: async ({ input }) => {
    try {
      const { error } = TransferValidate.validate(input);
      if (error) throw new Error(error.details[0].message);

      const newTransfer = new Transfer(input);
      await newTransfer.save();

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
      const payments = await Transfer.find({ user_id: id });

      return createResult({
        data: payments,
        message: "Payment fetched successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to fetch payment";
    }
  },
};
