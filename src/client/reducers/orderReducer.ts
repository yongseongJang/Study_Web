import { orderConstants } from "../actions";

const initialState = {
  isRequesting: false,
  isAllProduct: false,
  cartList: [],
  shippingInfo: null,
  orderInfo: [],
  nonMemberLogin: false,
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
    case orderConstants.REQUEST_MEMBER_ORDER_INFO:
      return {
        ...state,
        isRequesting: true,
        error: null,
      };
    case orderConstants.REQUEST_MEMBER_ORDER_INFO_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        orderInfo: action.orderInfo,
        error: null,
      };
    case orderConstants.REQUEST_MEMBER_ORDER_INFO_FAILURE:
      return {
        ...state,
        isRequesting: false,
        orderInfo: [],
        error: action.error,
      };
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO:
      return {
        ...state,
        isRequesting: true,
        nonMemberLogin: false,
        error: null,
      };
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        orderInfo: action.orderInfo,
        nonMemberLogin: true,
        error: null,
      };
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO_FAILURE:
      return {
        ...state,
        isRequesting: false,
        orderInfo: [],
        nonMemberLogin: false,
        error: action.error,
      };
    case orderConstants.REQUEST_MEMBER_PAYMENT:
      return {
        ...state,
        isRequesting: true,
      };
    case orderConstants.REQUEST_MEMBER_PAYMENT_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      };
    case orderConstants.REQUEST_MEMBER_PAYMENT_FAILURE:
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT:
      return {
        ...state,
        isRequesting: true,
      };
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      };
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT_FAILURE:
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    case orderConstants.RESET_ERROR:
      return { ...state, error: null };
    case orderConstants.RESET:
      return { ...initialState };
    default:
      return state;
  }
};
