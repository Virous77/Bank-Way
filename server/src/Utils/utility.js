import { verifyJwtToken } from "./jwttoken.js";

export const createResult = ({ data, message, status, token }) => {
  const newData = token
    ? {
        message,
        status,
        data: data || "",
        token,
      }
    : {
        message,
        status,
        data: data || "",
      };

  return newData;
};

export const generateOTP = () => {
  const otpLength = 6;
  let otp = "";

  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};

export const daysAgo = (days) => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - days
  );
};

export const validateJwtToken = async (token, id) => {
  if (!token) throw new Error("token not found");
  const tokenVerify = await verifyJwtToken(token);

  if (!tokenVerify) throw new Error("token is incorrect or session is over");
  if (tokenVerify.data._id !== id) throw new Error("token is incorrect");
};
