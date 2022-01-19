import { IProduct, IPagination, IProductDetail } from "../interfaces";

export const productConstants = {
  REQUEST_PRODUCTS: "REQUEST_PRODUCTS",
  REQUEST_PRODUCTS_SUCCESS: "REQUEST_PRODUCTS_SUCCESS",
  REQUEST_PRODUCTS_FAILURE: "REQUEST_PRODUCTS_FAILURE",
  REQUEST_PRODUCT_DETAIL: "REQUEST_PRODUCT_DETAIL",
  REQUEST_PRODUCT_DETAIL_SUCCESS: "REQUEST_PRODUCT_DETAIL_SUCCESS",
  REQUEST_PRODUCT_DETAIL_FAILURE: "REQUEST_PRODUCT_DETAIL_FAILURE",
};

const requestProducts = (category: string) => {
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

const requestProductDetail = (category: string, productId: number) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL,
    category,
    productId,
  };
};

const requestProductDetailSuccess = (productDetail: IProductDetail) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL_SUCCESS,
    productDetail,
  };
};

const requestProductDetailFailure = (err: unknown) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL_FAILURE,
    err,
  };
};

export const productActions = {
  requestProducts,
  requestProductsSuccess,
  requestProductsFailure,
  requestProductDetail,
  requestProductDetailSuccess,
  requestProductDetailFailure,
};
