import { take, call, put, fork, delay, cancel } from "redux-saga/effects";
import { Task } from "redux-saga";
import { loginServices } from "../services";
import { loginConstants, loginActions } from "../actions";
import { history } from "../utils/history";

let forkCheckAuthTimeout: Task;

export function* checkAuthTimeout(expirationTime: number) {
  yield delay(expirationTime);
  yield put(loginActions.logout());
}

export function* login(id: string, password: string) {
  try {
    const { token, expirationTime, userName } = yield call(
      loginServices.login,
      id,
      password,
    );

    yield put(loginActions.loginSuccess(token, id, userName));

    history.replace("/signup");

    forkCheckAuthTimeout = yield fork(checkAuthTimeout, expirationTime);
  } catch (err) {
    yield put(loginActions.loginFailure(err));
  }
}

export function* logout() {
  yield cancel(forkCheckAuthTimeout);
  yield put(loginActions.logoutSuccess());
  history.replace("/");
}

export function* watchLoginRequest() {
  while (true) {
    const { id, password } = yield take(loginConstants.LOGIN_REQUEST);
    yield call(login, id, password);
  }
}

export function* watchLogoutRequest() {
  while (true) {
    yield take(loginConstants.LOGOUT_REQUEST);
    yield call(logout);
  }
}

export const loginSaga = [fork(watchLoginRequest), fork(watchLogoutRequest)];
