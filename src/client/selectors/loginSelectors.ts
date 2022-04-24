import { RootState } from "../reducers/types";

const selectToken = (state: RootState) => {
  return state.loginReducer.token;
};

const selectError = (state: RootState) => {
  return state.loginReducer.error;
};

export default {
  selectToken,
  selectError,
};
