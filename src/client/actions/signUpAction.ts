import { IUserInfo } from "../interfaces";

export const signUpConstants = {
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
};

const signUp = (userInfo: IUserInfo) => {
  return { type: signUpConstants.SIGNUP_REQUEST, userInfo };
};

const signUpSuccess = () => {
  return { type: signUpConstants.SIGNUP_SUCCESS };
};

const signUpFailure = (err: unknown) => {
  return { type: signUpConstants.SIGNUP_FAILURE, err };
};

export const signUpActions = {
  signUp,
  signUpSuccess,
  signUpFailure,
};
