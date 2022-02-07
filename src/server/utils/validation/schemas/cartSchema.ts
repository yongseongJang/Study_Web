import * as Joi from "@hapi/joi";

export const cartSchema = Joi.object({
  _id: Joi.number(),
  user_id: Joi.number().required(),
  product_id: Joi.number().required(),
  quantity: Joi.number().required(),
  option: Joi.string().required(),
});
