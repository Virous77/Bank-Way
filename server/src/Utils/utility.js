export const createError = ({ status, message }) => {
  const err = new Error();
  (err.status = status), (err.message = message);

  return err;
};

export const createResult = ({ data, message, status }) => {
  const newData = {
    message,
    status,
    data: data || "",
  };

  return newData;
};
