import { cartConstants } from "../actions";

const initialState = {
  isRequesting: false,
  cartInfo: [],
};

export const cartReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case cartConstants.REQUEST_ADD:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_ADD:
      return { ...state, isRequesting: false, cartInfo: action.cartInfo };
    case cartConstants.FAILURE_ADD:
      return { ...state, isRequesting: false };
    default:
      return state;
  }
};
