import User from "../Models/User.js";
import {
  AuthValidate,
  PasswordValidate,
  ResetValidate,
  UserUpdateValidate,
} from "../Middleware/validate.js";
import {
  createResult,
  generateOTP,
  validateJwtToken,
} from "../Utils/utility.js";
import bcrypt from "bcryptjs";
import { SettingRoot } from "./settings.js";
import { sendOTP } from "../Middleware/sendMail.js";
import { createJwtToken } from "../Utils/jwttoken.js";

export const UserRoot = {
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
      SettingRoot.createSetting({ id: user._id });

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
    const { email, password } = input;
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) throw new Error("User not exists, Email is incorrect");

      const pass = await bcrypt.compare(password, user.password);
      if (!pass) throw new Error("Password is incorrect");
      const token = await createJwtToken(user);

      return createResult({
        data: user,
        message: "User Logged in Successfully",
        status: 201,
        token: token,
      });
    } catch (error) {
      throw error || "Failed to login user";
    }
  },

  updateUser: async ({ input }) => {
    try {
      await validateJwtToken(input.token, input.id);
      const { error } = UserUpdateValidate.validate(input);
      if (error) throw new Error(error.details[0].message);
      const { id, password, ...update } = input;
      const user = await User.findByIdAndUpdate(id, update, { new: true });

      if (!user) throw new Error("User not exists");

      return createResult({
        data: user,
        message: "User updated Successfully",
        status: 200,
        token: input.token,
      });
    } catch (error) {
      throw error || "Failed to update user";
    }
  },

  deleteUser: async ({ input }) => {
    try {
      await validateJwtToken(input.token, input.id);
      const user = await User.findByIdAndDelete(input.id);
      if (!user) throw new Error("User not exists");

      return createResult({
        data: user,
        message: user ? "User deleted Successfully" : "User don't exists",
        status: 200,
        token: input.token,
      });
    } catch (error) {
      throw error || "Failed to delete user";
    }
  },

  changePassword: async ({ input }) => {
    const { error } = PasswordValidate.validate(input);
    if (error) throw new Error(error.details[0].message);
    try {
      const user = await User.findById(input.id);
      if (!user) throw new Error("User not exists");

      const pass = await bcrypt.compare(input.password, user.password);
      if (!pass) throw new Error("Old password is wrong");

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.newPassword, salt);

      user.password = hash;
      await user.save();
      return createResult({
        data: user,
        message: "Password changed successfully",
        status: 200,
      });
    } catch (error) {
      throw error || "Failed to update password";
    }
  },

  getUser: async ({ input }) => {
    try {
      await validateJwtToken(input.token, input.id);
      const user = await User.findById(input.id);
      if (!user) throw new Error("User not exits");

      return createResult({
        data: user,
        message: "User fetched successfully",
        status: 200,
        token: input.token,
      });
    } catch (error) {
      throw error || "Failed to fetch user";
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

  forgetPassword: async ({ input }) => {
    try {
      if (!input.email) throw new Error("Email is required");
      const user = await User.findOne({ email: input.email.toLowerCase() });
      if (!user) throw new Error("Email not exists");

      const otp = generateOTP();
      user.otp = otp;
      await user.save();
      const isSent = await sendOTP(input.email.toLowerCase(), otp);

      if (isSent) {
        return {
          message: "OTP sent successfully!",
          status: true,
        };
      } else {
        user.otp = null;
        await user.save();
        throw new Error("Something went wrong,Try again");
      }
    } catch (error) {
      throw error || "Failed to send OTP";
    }
  },

  resetPassword: async ({ input }) => {
    try {
      const { error } = ResetValidate.validate(input);
      if (error) {
        if (error.details[0].message === `"otp" must be greater than 99999`) {
          throw new Error("OTP format is wrong");
        } else {
          console.log(error.details[0].message);
          throw new Error(error.details[0].message);
        }
      }

      if (input.password !== input.confirmPassword)
        throw new Error("New Password and Confirm Password doesn't match");

      const user = await User.findOne({ otp: input.otp });
      if (!user) throw new Error("OTP is wrong");

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.password, salt);

      user.password = hash;
      user.otp = null;
      user.save();

      return {
        message: "Password Reset Successfully",
        status: true,
      };
    } catch (error) {
      throw error || "Failed to reset Password";
    }
  },
};
