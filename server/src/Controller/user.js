import User from "../Models/User.js";
import { AuthValidate } from "../Middleware/validate.js";
import { createResult } from "../Utils/utility.js";
import bcrypt from "bcrypt";

export const root = {
  createUser: async ({ input }) => {
    try {
      const { error } = AuthValidate.validate(input);
      if (error) throw new Error(error.details[0].message);

      const isAlreadyRegistered = await User.findOne({
        email: input.email.toLowerCase(),
      });
      if (isAlreadyRegistered) throw new Error("Email id already exists");

      const { email, password, ...rest } = input;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const data = {
        ...rest,
        email: email.toLowerCase(),
        password: hash,
      };

      const user = new User(data);
      await user.save();

      return createResult({
        data: user,
        message: "User created Successfully",
        status: 201,
      });
    } catch (error) {
      throw error || "Failed to create user";
    }
  },

  loginUser: async ({ input }) => {
    try {
      console.log(input);
    } catch (error) {
      throw error || "Failed to login user";
    }
  },

  updateUser: async ({ input }) => {
    try {
      const { id, ...update } = input;
      const user = await User.findByIdAndUpdate(id, update, { new: true });

      if (!user) {
        throw new Error("User not exists");
      }

      return createResult({
        data: user,
        message: "User updated Successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to update user";
    }
  },

  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByIdAndDelete(id);
      return createResult({
        data: user,
        message: user ? "User deleted Successfully" : "User don't exists",
        status: 200,
      });
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },

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
};
