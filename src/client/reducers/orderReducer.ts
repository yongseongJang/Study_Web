import { orderConstants } from "../actions";

const initialState = {
  isRequesting: false,
  isAllProduct: false,
  cartList: [],
  shippingInfo: null,
  error: null,
};

export const orderReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case orderConstants.REQUEST_ORDER_ADD:
      return { ...state, isRequesting: true };
    case orderConstants.SUCCESS_ORDER_ADD:
      return {
        ...state,
        isRequesting: false,
        isAllProduct: action.isAllProduct,
        cartList: action.cartList ? action.cartList : [],
      };
    case orderConstants.FAILURE_ORDER_ADD:
      return { ...state, isRequesting: false };
    case orderConstants.REQUEST_SHIPPING_INFO:
      return { ...state, isRequesting: true, error: null };

    case orderConstants.REQUEST_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        shippingInfo: action.shippingInfo,
        error: null,
      };
    case orderConstants.REQUEST_SHIPPING_INFO_FAILURE:
      return {
        ...state,
        isRequesting: false,
        shippingInfo: null,
        error: action.error,
      };
    default:
      return state;
  }
};
