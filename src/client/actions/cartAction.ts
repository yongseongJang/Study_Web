import { ICartInfo, IProduct } from "../interfaces";

export const cartConstants = {
  REQUEST_ADD: "REQUEST_ADD",
  SUCCESS_ADD: "SUCCESS_ADD",
  FAILURE_ADD: "FAILURE_ADD",
  REQUEST_REMOVE: "REQUEST_REMOVE",
  SUCCESS_REMOVE: "SUCCESS_REMOVE",
  FAILURE_REMOVE: "FAILURE_REMOVE",
  REQUEST_REMOVE_ALL: "REQUEST_REMOVE_ALL",
  SUCCESS_REMOVE_ALL: "SUCCESS_REMOVE_ALL",
  FAILURE_REMOVE_ALL: "FAILURE_REMOVE_ALL",
  REQUEST_CART_PRODUCT: "REQUEST_CART_PRODUCT",
  REQUEST_CART_PRODUCT_SUCCESS: "REQUEST_CART_PRODUCT_SUCCESS",
  REQUEST_CART_PRODUCT_FAILURE: "REQUEST_CART_PRODUCT_FAILURE",
};

const add = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.REQUEST_ADD,
    cartInfo,
  };
};

const addSuccess = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.SUCCESS_ADD,
    cartInfo,
  };
};

const addFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_ADD,
    err,
  };
};

const remove = (productId: number, option: string) => {
  return {
    type: cartConstants.REQUEST_REMOVE,
    productId,
    option,
  };
};

const removeSuccess = (productId: number, option: string) => {
  return {
    type: cartConstants.SUCCESS_REMOVE,
    productId,
    option,
  };
};

const removeFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_REMOVE,
    err,
  };
};

const removeAll = () => {
  return { type: cartConstants.REQUEST_REMOVE_ALL };
};

const removeAllSuccess = () => {
  return { type: cartConstants.SUCCESS_REMOVE_ALL };
};

const removeAllFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_REMOVE_ALL,
    err,
  };
};

const requestCartProduct = () => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT,
  };
};

const requestCartProductSuccess = () => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_SUCCESS,
  };
};

const requestCartProductFailure = () => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_FAILURE,
  };
};

export const cartActions = {
  add,
  addSuccess,
  addFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeAll,
  removeAllSuccess,
  removeAllFailure,
  requestCartProduct,
  requestCartProductSuccess,
  requestCartProductFailure,
};
