import { take, call, put, fork } from "redux-saga/effects";
import { signupServices } from "../services";
import { signupConstants, signupActions } from "../actions";
import { createBrowserHistory } from "history";
import { IUserInfo } from "../interfaces";

const history = createBrowserHistory();

function* signup(userInfo: IUserInfo) {
  try {
    yield call(signupServices.signup, userInfo);

    yield put(signupActions.signupSuccess());
    history.replace("/");
  } catch (err) {
    yield put(signupActions.signupFailure(err));
  }
}

function* watchSignupRequest() {
  while (true) {
    const { userInfo } = yield take(signupConstants.SIGNUP_REQUEST);

    yield call(signup, userInfo);
  }
}

export const signupSaga = [fork(watchSignupRequest)];
