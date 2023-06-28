import joi from "joi";

export const AuthValidate = joi
  .object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  })
  .options({ stripUnknown: true });

export const UserUpdateValidate = joi
  .object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    image: joi.string().trim().required(),
  })
  .options({ stripUnknown: true });

export const PasswordValidate = joi.object({
  id: joi.string().trim().required(),
  password: joi.string().trim().required(),
  newPassword: joi.string().trim().required(),
});
