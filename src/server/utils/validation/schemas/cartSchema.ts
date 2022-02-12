import * as Joi from "@hapi/joi";

export const cartSchema = Joi.object({
  _id: Joi.number(),
  userId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
  option: Joi.string().required(),
});
