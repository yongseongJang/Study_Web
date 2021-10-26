import { IUserInfo } from "../interfaces";

export const signupConstants = {
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
};

const signup = (userInfo: IUserInfo) => {
  return { type: signupConstants.SIGNUP_REQUEST, userInfo };
};

const signupSuccess = () => {
  return { type: signupConstants.SIGNUP_SUCCESS };
};

const signupFailure = (err: unknown) => {
  return { type: signupConstants.SIGNUP_FAILURE, err };
};

export const signupActions = {
  signup,
  signupSuccess,
  signupFailure,
};
