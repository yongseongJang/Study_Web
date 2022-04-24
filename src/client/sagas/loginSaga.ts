import { take, call, put, fork, delay, cancel } from "redux-saga/effects";
import { Task } from "redux-saga";
import { loginServices } from "../services";
import { loginConstants, loginActions } from "../actions";
import { history } from "../utils/history";
import { ILoginInfo } from "../interfaces";

let forkCheckAuthTimeout: Task;

export function* checkAuthTimeout(expirationTime: number) {
  yield delay(expirationTime);
  yield put(loginActions.logout());
}

export function* login(payload: { loginInfo: ILoginInfo }) {
  try {
    const { loginInfo } = payload;
    const { token, expirationTime, userName } = yield call(
      loginServices.login,
      loginInfo,
    );

    yield put(loginActions.loginSuccess(token, userName));

    history.replace("/");

    forkCheckAuthTimeout = yield fork(checkAuthTimeout, expirationTime);
  } catch (err) {
    yield put(loginActions.loginFailure(err));
  }
}

export function* logout() {
  yield put(loginActions.logoutSuccess());
  history.replace("/");
  yield cancel(forkCheckAuthTimeout);
}

export function* watchLoginRequest() {
  while (true) {
    const { payload } = yield take(loginConstants.LOGIN_REQUEST);
    yield call(login, payload);
  }
}

export function* watchLogoutRequest() {
  while (true) {
    yield take(loginConstants.LOGOUT_REQUEST);
    yield call(logout);
  }
}

export const loginSaga = [fork(watchLoginRequest), fork(watchLogoutRequest)];
