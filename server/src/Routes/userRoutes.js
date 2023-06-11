import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
  getUser,
} from "../Controller/userController.js";
import { AuthValidate } from "../Middleware/validate.js";

const router = express.Router();

router.post("/user", AuthValidate, createUser);
router.get("/user/:id", getUser);
router.post("/user/login", loginUser);
router.put("/user/:id", updateUser);
router.put("/user/change-password/:id", changePassword);

export default router;
