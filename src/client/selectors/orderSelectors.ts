import { RootState } from "../reducers/types";

const selectIsRequesting = (state: RootState) => {
  return state.orderReducer.isRequesting;
};

const selectError = (state: RootState) => {
  return state.orderReducer.error;
};

const selectOrderInfo = (state: RootState) => {
  return state.orderReducer.orderInfo.toArray();
};

const selectNonMemberLogin = (state: RootState) => {
  return state.orderReducer.nonMemberLogin;
};

const selectIsAllProduct = (state: RootState) => {
  return state.orderReducer.isAllProduct;
};

const selectCartList = (state: RootState) => {
  return state.orderReducer.cartList.toArray();
};

export default {
  selectIsRequesting,
  selectError,
  selectOrderInfo,
  selectNonMemberLogin,
  selectIsAllProduct,
  selectCartList,
};
