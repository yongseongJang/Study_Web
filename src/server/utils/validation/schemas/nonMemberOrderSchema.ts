import * as Joi from "@hapi/joi";

export const nonMemberOrderSchema = Joi.object().keys({
  _id: Joi.any(),
  recipient: Joi.string().required(),
  address: Joi.string().required(),
  cellularPhone: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string(),
  price: Joi.number().required(),
  payment: Joi.number().required(),
  pw: Joi.string().required(),
  orderDetail: Joi.array().items(
    Joi.object().keys({
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      orderDetailOption: Joi.string().required(),
      status: Joi.number().required(),
      productId: Joi.number().required(),
    }),
  ),
});
