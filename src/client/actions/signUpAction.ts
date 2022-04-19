import { IUserDto } from "../interfaces";

export const signUpConstants = {
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
};

const signUp = (userDto: IUserDto) => {
  return { type: signUpConstants.SIGNUP_REQUEST, payload: { userDto } };
};

const signUpSuccess = () => {
  return { type: signUpConstants.SIGNUP_SUCCESS };
};

const signUpFailure = (err: unknown) => {
  return { type: signUpConstants.SIGNUP_FAILURE, payload: { err } };
};

export const signUpActions = {
  signUp,
  signUpSuccess,
  signUpFailure,
};
