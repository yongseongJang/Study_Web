import * as Joi from "@hapi/joi";

export const userRegistrationSchema = Joi.object()
  .keys({
    _id: Joi.any(),
    id: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    regularPhone: Joi.string(),
    cellularPhone: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "kr"] } })
      .required(),
    isForever: Joi.boolean(),
    birthday: Joi.string().required(),
    membershipLevel: Joi.string().required(),
  })
  .required();

export const emailSchema = Joi.string()
  .email({ tlds: { allow: ["com", "net"] } })
  .required();
