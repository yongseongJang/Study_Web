import { IOrderInfo } from "../interfaces";
import { IShippingInfo } from "../interfaces";

export const orderConstants = {
  REQUEST_ORDER_ADD: "REQUEST_ORDER_ADD",
  SUCCESS_ORDER_ADD: "SUCCESS_ORDER_ADD",
  FAILURE_ORDER_ADD: "FAILURE_ORDER_ADD",
  REQUEST_SHIPPING_INFO: "REQUEST_SHIPPING_INFO",
  REQUEST_SHIPPING_INFO_SUCCESS: "REQUEST_SHIPPING_INFO_SUCCESS",
  REQUEST_SHIPPING_INFO_FAILURE: "REQUEST_SHIPPING_INFO_FAILURE",
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

const requestShippingInfo = (token: string) => {
  return {
    type: orderConstants.REQUEST_SHIPPING_INFO,
    token,
  };
};

const requestShippingInfoSuccess = (shippingInfo: IShippingInfo) => {
  return {
    type: orderConstants.REQUEST_SHIPPING_INFO_SUCCESS,
    shippingInfo,
  };
};

const requestShippingInfoFailure = (err: unknown) => {
  return {
    type: orderConstants.REQUEST_SHIPPING_INFO_FAILURE,
    err,
  };
};

export const orderActions = {
  add,
  addSuccess,
  addFailure,
  requestShippingInfo,
  requestShippingInfoSuccess,
  requestShippingInfoFailure,
};
