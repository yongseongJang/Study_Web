import { RootState } from "../reducers/types";

const selectIsRequesting = (state: RootState) => {
  return state.cartReducer.isRequesting;
};

const selectCartInfo = (state: RootState) => {
  return state.cartReducer.cartInfo.toArray();
};

export default {
  selectIsRequesting,
  selectCartInfo,
};
