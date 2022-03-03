import { orderConstants } from "../actions";

const initialState: {
  isRequesting: boolean;
  isAllProduct: boolean;
  cartList: number[];
} = {
  isRequesting: false,
  isAllProduct: false,
  cartList: [],
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
    default:
      return state;
  }
};
