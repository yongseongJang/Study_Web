import Errorhandler from "../error";
import * as Joi from "@hapi/joi";

const createValidator =
  (schema: Joi.Schema): Function =>
  (payload: object | string): string | object => {
    try {
      return schema.validate(payload).value;
    } catch (err) {
      throw new Errorhandler(400, "ValidationError", "");
    }
  };

export default createValidator;
