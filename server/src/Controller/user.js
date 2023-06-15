import User from "../Models/User.js";
import { AuthValidate } from "../Middleware/validate.js";
import { createError, createResult } from "../Utils/utility.js";

export const root = {
  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },

  createUser: async ({ input }) => {
    try {
      const { error } = AuthValidate.validate(input);
      if (error) {
        return createError({
          message: error.details[0].message,
          status: 400,
        });
      }

      // throw new Error(error.details[0].message);

      const user = new User(input);
      await user.save();

      return createResult({
        data: user,
        message: "User created Successfully",
        status: 201,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async ({ input }) => {
    try {
      const { id, ...update } = input;
      const user = await User.findByIdAndUpdate(id, update, { new: true });
      return user;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },

  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
};
