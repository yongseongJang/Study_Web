import { RootState } from "../index";

const selectToken = (state: RootState) => {
  return state.loginReducer.token;
};

const selectExpirationTime = (state: RootState) => {
  return state.loginReducer.expirationTime;
};

const selectError = (state: RootState) => {
  return state.loginReducer.error;
};

export default {
  selectToken,
  selectExpirationTime,
  selectError,
};
