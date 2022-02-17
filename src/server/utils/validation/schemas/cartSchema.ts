import * as Joi from "@hapi/joi";

export const addCartSchema = Joi.array().items(
  Joi.object({
    _id: Joi.number(),
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
    option: Joi.string().required(),
  }),
);

export const removeCartSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().required(),
    option: Joi.string().required(),
  }),
);
