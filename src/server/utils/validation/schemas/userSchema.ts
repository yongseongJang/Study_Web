import * as Joi from "@hapi/joi";

export const userRegistrationSchema = Joi.object()
  .keys({
    _id: Joi.any(),
    id: Joi.string().required(),
    pw: Joi.string().required(),
    pw_check: Joi.string().required(),
    name: Joi.string().required(),
    // address: Joi.string().required(),
    cellularPhone: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "kr"] } })
      .required(),
    // birthday: Joi.string().required(),
  })
  .required();

export const emailSchema = Joi.string()
  .email({ tlds: { allow: ["com", "net"] } })
  .required();
