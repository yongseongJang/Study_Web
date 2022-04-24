import { ILoginInfo } from "../interfaces";

export const loginConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  RESET_ERROR: "RESET_ERROR",
};

const login = (loginInfo: ILoginInfo) => {
  return {
    type: loginConstants.LOGIN_REQUEST,
    payload: { loginInfo },
  };
};

const loginSuccess = (token: string, userName: string) => {
  return {
    type: loginConstants.LOGIN_SUCCESS,
    payload: { token, userName },
  };
};

const loginFailure = (err: unknown) => {
  return {
    type: loginConstants.LOGIN_FAILURE,
    payload: { err },
  };
};

const logout = () => {
  return { type: loginConstants.LOGOUT_REQUEST };
};

const logoutSuccess = () => {
  return { type: loginConstants.LOGOUT_SUCCESS };
};

const resetError = () => {
  return { type: loginConstants.RESET_ERROR };
};

export const loginActions = {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  resetError,
};
