import { IOrderInfo } from "../interfaces";

export const orderConstants = {
  REQUEST_ORDER_ADD: "REQUEST_ORDER_ADD",
  SUCCESS_ORDER_ADD: "SUCCESS_ORDER_ADD",
  FAILURE_ORDER_ADD: "FAILURE_ORDER_ADD",
};

const add = (isAllProduct: boolean, cartList?: number[]) => {
  return {
    type: orderConstants.REQUEST_ORDER_ADD,
    isAllProduct,
    cartList,
  };
};

const addSuccess = (isAllProduct: boolean, cartList?: number[]) => {
  return {
    type: orderConstants.SUCCESS_ORDER_ADD,
    isAllProduct,
    cartList,
  };
};

const addFailure = (err: unknown) => {
  return {
    type: orderConstants.FAILURE_ORDER_ADD,
    err,
  };
};

export const orderActions = {
  add,
  addSuccess,
  addFailure,
};
