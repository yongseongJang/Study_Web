import { IProduct, IPagination } from "../interfaces";

export const productConstants = {
  REQUEST_PRODUCTS: "REQUEST_PRODUCTS",
  REQUEST_PRODUCTS_SUCCESS: "REQUEST_PRODUCTS_SUCCESS",
  REQUEST_PRODUCTS_FAILURE: "REQUEST_PRODUCTS_FAILURE",
  REQUEST_PRODUCT_DETAIL: "REQUEST_PRODUCT_DETAIL",
  REQUEST_PRODUCT_DETAIL_SUCCESS: "REQUEST_PRODUCT_DETAIL_SUCCESS",
  REQUEST_PRODUCT_DETAIL_FAILURE: "REQUEST_PRODUCT_DETAIL_FAILURE",
};

const requestProducts = (category: string, page = 1) => {
  return {
    type: productConstants.REQUEST_PRODUCTS,
    category,
    page,
  };
};

const requestProductsSuccess = (
  pagination: IPagination,
  productList: Omit<
    IProduct,
    "productDetail" | "productImage" | "productCaution" | "productSize"
  >[],
) => {
  return {
    type: productConstants.REQUEST_PRODUCTS_SUCCESS,
    pagination,
    productList,
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

const requestProductDetailSuccess = (product: IProduct) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL_SUCCESS,
    product,
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
