import joi from "joi";

export const AuthValidate = joi
  .object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  })
  .options({ stripUnknown: true });
