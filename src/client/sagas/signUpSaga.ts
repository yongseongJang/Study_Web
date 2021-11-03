import { take, call, put, fork } from "redux-saga/effects";
import { signUpServices } from "../services";
import { signUpConstants, signUpActions } from "../actions";
import { createBrowserHistory } from "history";
import { IUserInfo } from "../interfaces";

const history = createBrowserHistory();

function* signUp(userInfo: IUserInfo) {
  try {
    yield call(signUpServices.signUp, userInfo);

    yield put(signUpActions.signUpSuccess());
    history.replace("/");
  } catch (err) {
    yield put(signUpActions.signUpFailure(err));
  }
}

function* watchSignUpRequest() {
  while (true) {
    const { userInfo } = yield take(signUpConstants.SIGNUP_REQUEST);

    yield call(signUp, userInfo);
  }
}

export const signUpSaga = [fork(watchSignUpRequest)];
