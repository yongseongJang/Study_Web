import { RootState } from "../reducers/types";

const selectIsRequesting = (state: RootState) => {
  return state.productReducer.isRequesting;
};

const selectProductList = (state: RootState) => {
  return state.productReducer.productList.toArray();
};

const selectPagination = (state: RootState) => {
  return state.productReducer.pagination;
};

const selectProductDetail = (state: RootState) => {
  return state.productReducer.productDetail;
};

const selectProductDetails = (state: RootState) => {
  return state.productReducer.productDetail.productDetail.toArray();
};

const selectProductImage = (state: RootState) => {
  return state.productReducer.productDetail.productImage.toArray();
};

const selectProductCaution = (state: RootState) => {
  return state.productReducer.productDetail.productCaution.toArray();
};

const selectProductSize = (state: RootState) => {
  return state.productReducer.productDetail.productSize.toArray();
};

export default {
  selectIsRequesting,
  selectProductList,
  selectPagination,
  selectProductDetail,
  selectProductDetails,
  selectProductImage,
  selectProductCaution,
  selectProductSize,
};
