import * as Joi from "@hapi/joi";

export const cartSchema = Joi.array().items(
  Joi.object({
    _id: Joi.number(),
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
    option: Joi.string().required(),
  }),
);
