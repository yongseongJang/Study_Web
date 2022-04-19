import { take, call, put, fork } from "redux-saga/effects";
import { signUpServices } from "../services";
import { signUpConstants, signUpActions } from "../actions";
import { history } from "../utils/history";
import { IUserDto } from "../interfaces";

function* signUp(payload: { userDto: IUserDto }) {
  try {
    yield call(signUpServices.signUp, payload.userDto);

    yield put(signUpActions.signUpSuccess());
    history.replace("/");
  } catch (err) {
    yield put(signUpActions.signUpFailure(err));
  }
}

function* watchSignUpRequest() {
  while (true) {
    const { payload } = yield take(signUpConstants.SIGNUP_REQUEST);

    yield call(signUp, payload);
  }
}

export const signUpSaga = [fork(watchSignUpRequest)];
