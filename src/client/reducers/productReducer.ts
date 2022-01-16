import { productConstants } from "../actions";

const initialState = {
  isRequesting: false,
  pagination: [],
  products: [],
};

export const productReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case productConstants.REQUEST_PRODUCTS:
      return { ...state, isRequesting: true };
    case productConstants.REQUEST_PRODUCTS_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        pagination: action.pagination,
        products: action.products,
      };
    case productConstants.REQUEST_PRODUCTS_FAILURE:
      return { ...state, isRequesting: false };
    default:
      return state;
  }
};
