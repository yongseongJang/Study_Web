import { take, call, put, fork } from "redux-saga/effects";
import { signUpServices } from "../services";
import { signUpActions } from "../reducers/signUpReducer";
import { history } from "../utils/history";
import { IUserInfo } from "../interfaces";

function* signUp(payload: { userInfo: IUserInfo }) {
  try {
    yield call(signUpServices.signUp, payload.userInfo);

    yield put(signUpActions.signUpSuccess());
    history.replace("/");
  } catch (err) {
    yield put(signUpActions.signUpFailure({ err }));
  }
}

function* watchSignUpRequest() {
  while (true) {
    const { payload } = yield take(signUpActions.signUp);

    yield call(signUp, payload);
  }
}

export const signUpSaga = [fork(watchSignUpRequest)];
