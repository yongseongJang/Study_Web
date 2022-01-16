import { IProduct, IPagination } from "../interfaces";

export const productConstants = {
  REQUEST_PRODUCTS: "REQUEST_PRODUCTS",
  REQUEST_PRODUCTS_SUCCESS: "REQUEST_PRODUCTS_SUCCESS",
  REQUEST_PRODUCTS_FAILURE: "REQUEST_PRODUCTS_FAILURE",
};

const requestProducts = (category?: string) => {
  return {
    type: productConstants.REQUEST_PRODUCTS,
    category,
  };
};

const requestProductsSuccess = (
  pagination: IPagination,
  products: IProduct[],
) => {
  return {
    type: productConstants.REQUEST_PRODUCTS_SUCCESS,
    pagination,
    products,
  };
};

const requestProductsFailure = (err: unknown) => {
  return {
    type: productConstants.REQUEST_PRODUCTS_FAILURE,
    err,
  };
};

export const productActions = {
  requestProducts,
  requestProductsSuccess,
  requestProductsFailure,
};
