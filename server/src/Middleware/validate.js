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

export const ActivityValidate = joi
  .object({
    type: joi.string().trim().required(),
    type_name: joi.string().trim().required(),
    amount: joi.number().required().greater(0),
    date: joi.string().trim().required(),
  })
  .options({ stripUnknown: true });

export const TransferValidate = joi
  .object({
    transfer_to: joi.string().trim().required(),
    amount: joi.number().required().greater(0),
    notes: joi.string().trim().required(),
  })
  .options({ stripUnknown: true });

export const ResetValidate = joi.object({
  otp: joi.number().greater(99999).required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().trim().required(),
});
