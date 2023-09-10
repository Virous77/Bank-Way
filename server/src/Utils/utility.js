export const createResult = ({ data, message, status }) => {
  const newData = {
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
    otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
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
