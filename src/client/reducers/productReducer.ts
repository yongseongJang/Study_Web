import { productConstants } from "../actions";

const initialState = {
  isRequesting: false,
  pagination: {},
  productList: [],
  product: {},
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
        productList: action.productList,
      };
    case productConstants.REQUEST_PRODUCTS_FAILURE:
      return { ...state, isRequesting: false };
    case productConstants.REQUEST_PRODUCT_DETAIL:
      return { ...state, isRequesting: false };
    case productConstants.REQUEST_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isRequesting: true,
        product: action.product,
      };
    case productConstants.REQUEST_PRODUCT_DETAIL_FAILURE:
      return { ...state, isRequesting: false };
    default:
      return state;
  }
};
