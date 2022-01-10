import * as Joi from "@hapi/joi";

export const userRegistrationSchema = Joi.object({
  _id: Joi.any(),
  id: Joi.string().required(),
  pw: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  regular_phone: Joi.string(),
  cellular_phone: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "kr"] } })
    .required(),
  is_forever: Joi.boolean(),
  birthday: Joi.string().required(),
  membership_level: Joi.string().required(),
});

export const emailSchema = Joi.string()
  .email({ tlds: { allow: ["com", "net"] } })
  .required();
