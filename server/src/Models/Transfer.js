import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema(
  {
    transfer_to: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transfer", TransferSchema);
