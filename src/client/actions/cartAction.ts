import { ICartInfo } from "../interfaces";

export const cartConstants = {
  REQUEST_ADD: "REQUEST_ADD",
  SUCCESS_ADD: "SUCCESS_ADD",
  FAILURE_ADD: "FAILURE_ADD",
  REQUEST_REMOVE: "REQUEST_REMOVE",
  SUCCESS_REMOVE: "SUCCESS_REMOVE",
  FAILURE_REMOVE: "FAILURE_REMOVE",
  REQUEST_SELECT_REMOVE: "REQUEST_SELECT_REMOVE",
  SUCCESS_SELECT_REMOVE: "SUCCESS_SELECT_REMOVE",
  FAILURE_SELECT_REMOVE: "FAILURE_SELECT_REMOVE",
  REQUEST_REMOVE_ALL: "REQUEST_REMOVE_ALL",
  SUCCESS_REMOVE_ALL: "SUCCESS_REMOVE_ALL",
  FAILURE_REMOVE_ALL: "FAILURE_REMOVE_ALL",
  REQUEST_INCREASE_QUANTITY: "REQUEST_INCREASE_QUANTITY",
  SUCCESS_INCREASE_QUANTITY: "SUCCESS_INCREASE_QUANTITY",
  FAILURE_INCREASE_QUANTITY: "FAILURE_INCREASE_QUANTITY",
  REQUEST_DECREASE_QUANTITY: "REQUEST_DECREASE_QUANTITY",
  SUCCESS_DECREASE_QUANTITY: "SUCCESS_DECREASE_QUANTITY",
  FAILURE_DECREASE_QUANTITY: "FAILURE_DECREASE_QUANTITY",
  REQUEST_CHANGE_QUANTITY: "REQUEST_CHANGE_QUANTITY",
  SUCCESS_CHANGE_QUANTITY: "SUCCESS_CHANGE_QUANTITY",
  FAILURE_CHANGE_QUANTITY: "FAILURE_CHANGE_QUANTITY",
  REQUEST_CART_PRODUCT: "REQUEST_CART_PRODUCT",
  REQUEST_CART_PRODUCT_SUCCESS: "REQUEST_CART_PRODUCT_SUCCESS",
  REQUEST_CART_PRODUCT_FAILURE: "REQUEST_CART_PRODUCT_FAILURE",
};

const add = (cartInfo: ICartInfo[], token?: string) => {
  return {
    type: cartConstants.REQUEST_ADD,
    cartInfo,
    token,
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

const remove = (productId: number, option: string, token: string) => {
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

const selectRemove = (
  selectInfo: Pick<ICartInfo, "productId" | "option">[],
  token: string,
) => {
  return {
    type: cartConstants.REQUEST_SELECT_REMOVE,
    selectInfo,
  };
};

const selectRemoveSuccess = (
  selectInfo: Pick<ICartInfo, "productId" | "option">[],
) => {
  return {
    type: cartConstants.SUCCESS_SELECT_REMOVE,
    selectInfo,
  };
};

const selectRemoveFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_SELECT_REMOVE,
    err,
  };
};

const removeAll = (token: string) => {
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

const increaseQuantity = (productId: number, option: string) => {
  return {
    type: cartConstants.REQUEST_INCREASE_QUANTITY,
    productId,
    option,
  };
};

const increaseQuantitySuccess = (productId: number, option: string) => {
  return { type: cartConstants.SUCCESS_INCREASE_QUANTITY, productId, option };
};

const increaseQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_INCREASE_QUANTITY, err };
};

const decreaseQuantity = (productId: number, option: string) => {
  return {
    type: cartConstants.REQUEST_DECREASE_QUANTITY,
    productId,
    option,
  };
};

const decreaseQuantitySuccess = (productId: number, option: string) => {
  return { type: cartConstants.SUCCESS_DECREASE_QUANTITY, productId, option };
};

const decreaseQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_DECREASE_QUANTITY, err };
};

const changeQuantity = (
  productId: number,
  option: string,
  quantity: number,
) => {
  return {
    type: cartConstants.REQUEST_CHANGE_QUANTITY,
    productId,
    option,
    quantity,
  };
};

const changeQuantitySuccess = (
  productId: number,
  option: string,
  quantity: number,
) => {
  return {
    type: cartConstants.SUCCESS_CHANGE_QUANTITY,
    productId,
    option,
    quantity,
  };
};

const changeQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_CHANGE_QUANTITY, err };
};

const requestCartProduct = (token: string) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT,
  };
};

const requestCartProductSuccess = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_SUCCESS,
    cartInfo,
  };
};

const requestCartProductFailure = (err: unknown) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_FAILURE,
    err,
  };
};

export const cartActions = {
  add,
  addSuccess,
  addFailure,
  remove,
  removeSuccess,
  removeFailure,
  selectRemove,
  selectRemoveSuccess,
  selectRemoveFailure,
  removeAll,
  removeAllSuccess,
  removeAllFailure,
  increaseQuantity,
  increaseQuantitySuccess,
  increaseQuantityFailure,
  decreaseQuantity,
  decreaseQuantitySuccess,
  decreaseQuantityFailure,
  changeQuantity,
  changeQuantitySuccess,
  changeQuantityFailure,
  requestCartProduct,
  requestCartProductSuccess,
  requestCartProductFailure,
};
