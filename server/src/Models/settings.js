import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    transaction_icon_type: {
      type: Boolean,
      default: false,
    },
    home_transaction_duration: {
      type: String,
      default: "weekly",
    },
    home_transaction_type: {
      type: String,
      default: "all",
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

export default mongoose.model("Setting", SettingsSchema);
