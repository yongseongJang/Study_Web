import * as Joi from "@hapi/joi";

export const userRegistrationSchema = Joi.object({
  _id: Joi.any(),
  id: Joi.string().required(),
  pw: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "kr"] } })
    .required(),
  phoneNumber: Joi.string().required(),
});

export const emailSchema = Joi.string()
  .email({ tlds: { allow: ["com", "net"] } })
  .required();
