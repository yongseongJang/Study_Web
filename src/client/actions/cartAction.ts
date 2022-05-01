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
  SET_CART_PRODUCT: "SET_CART_PRODUCT",
};

const add = (cartInfo: ICartInfo[], token?: string) => {
  return {
    type: cartConstants.REQUEST_ADD,
    payload: {
      cartInfo,
      token,
    },
  };
};

const addSuccess = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.SUCCESS_ADD,
    payload: {
      cartInfo,
    },
  };
};

const addFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_ADD,
    payload: {
      err,
    },
  };
};

const remove = (productId: number, option: string, token: string) => {
  return {
    type: cartConstants.REQUEST_REMOVE,
    payload: {
      productId,
      option,
      token,
    },
  };
};

const removeSuccess = (productId: number, option: string) => {
  return {
    type: cartConstants.SUCCESS_REMOVE,
    payload: {
      productId,
      option,
    },
  };
};

const removeFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_REMOVE,
    payload: {
      err,
    },
  };
};

const selectRemove = (
  cartInfo: Pick<ICartInfo, "productId" | "option">[],
  token: string,
) => {
  return {
    type: cartConstants.REQUEST_SELECT_REMOVE,
    payload: {
      cartInfo,
      token,
    },
  };
};

const selectRemoveSuccess = (
  cartInfo: Pick<ICartInfo, "productId" | "option">[],
) => {
  return {
    type: cartConstants.SUCCESS_SELECT_REMOVE,
    payload: {
      cartInfo,
    },
  };
};

const selectRemoveFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_SELECT_REMOVE,
    payload: {
      err,
    },
  };
};

const removeAll = (token: string) => {
  return { type: cartConstants.REQUEST_REMOVE_ALL, payload: { token } };
};

const removeAllSuccess = () => {
  return { type: cartConstants.SUCCESS_REMOVE_ALL };
};

const removeAllFailure = (err: unknown) => {
  return {
    type: cartConstants.FAILURE_REMOVE_ALL,
    payload: {
      err,
    },
  };
};

const increaseQuantity = (productId: number, option: string) => {
  return {
    type: cartConstants.REQUEST_INCREASE_QUANTITY,
    payload: {
      productId,
      option,
    },
  };
};

const increaseQuantitySuccess = (productId: number, option: string) => {
  return {
    type: cartConstants.SUCCESS_INCREASE_QUANTITY,
    payload: { productId, option },
  };
};

const increaseQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_INCREASE_QUANTITY, payload: { err } };
};

const decreaseQuantity = (productId: number, option: string) => {
  return {
    type: cartConstants.REQUEST_DECREASE_QUANTITY,
    payload: {
      productId,
      option,
    },
  };
};

const decreaseQuantitySuccess = (productId: number, option: string) => {
  return {
    type: cartConstants.SUCCESS_DECREASE_QUANTITY,
    payload: { productId, option },
  };
};

const decreaseQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_DECREASE_QUANTITY, payload: { err } };
};

const changeQuantity = (
  productId: number,
  option: string,
  quantity: number,
) => {
  return {
    type: cartConstants.REQUEST_CHANGE_QUANTITY,
    payload: {
      productId,
      option,
      quantity,
    },
  };
};

const changeQuantitySuccess = (
  productId: number,
  option: string,
  quantity: number,
) => {
  return {
    type: cartConstants.SUCCESS_CHANGE_QUANTITY,
    payload: {
      productId,
      option,
      quantity,
    },
  };
};

const changeQuantityFailure = (err: unknown) => {
  return { type: cartConstants.FAILURE_CHANGE_QUANTITY, payload: { err } };
};

const requestCartProduct = (token: string) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT,
    payload: {
      token,
    },
  };
};

const requestCartProductSuccess = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_SUCCESS,
    payload: {
      cartInfo,
    },
  };
};

const requestCartProductFailure = (err: unknown) => {
  return {
    type: cartConstants.REQUEST_CART_PRODUCT_FAILURE,
    payload: {
      err,
    },
  };
};

const setCartProduct = (cartInfo: ICartInfo[]) => {
  return {
    type: cartConstants.SET_CART_PRODUCT,
    payload: {
      cartInfo,
    },
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
  setCartProduct,
};
