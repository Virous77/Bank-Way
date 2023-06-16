export const createResult = ({ data, message, status }) => {
  const newData = {
    message,
    status,
    data: data || "",
  };

  return newData;
};
