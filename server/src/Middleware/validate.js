import joi from "joi";

export const AuthValidate = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        name: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
      })
      .options({ stripUnknown: true });

    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};
