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
    payload: {
      category,
      page,
    },
  };
};

const requestProductsSuccess = (
  pagination: IPagination,
  productList: {
    product: Omit<
      IProduct,
      "productDetail" | "productImage" | "productCaution" | "productSize"
    >;
  }[],
) => {
  return {
    type: productConstants.REQUEST_PRODUCTS_SUCCESS,
    payload: {
      pagination,
      productList,
    },
  };
};

const requestProductsFailure = (err: unknown) => {
  return {
    type: productConstants.REQUEST_PRODUCTS_FAILURE,
    payload: {
      err,
    },
  };
};

const requestProductDetail = (category: string, productId: number) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL,
    payload: {
      category,
      productId,
    },
  };
};

const requestProductDetailSuccess = (product: IProduct) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL_SUCCESS,
    payload: {
      product,
    },
  };
};

const requestProductDetailFailure = (err: unknown) => {
  return {
    type: productConstants.REQUEST_PRODUCT_DETAIL_FAILURE,
    payload: {
      err,
    },
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
