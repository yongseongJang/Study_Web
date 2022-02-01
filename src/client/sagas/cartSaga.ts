import { take, call, put, fork } from "redux-saga/effects";
import { cartConstants, cartActions } from "../actions";
import { ICartInfo } from "../interfaces";

export function* requestAdd(cartInfo: ICartInfo[]) {
  try {
    yield put(cartActions.addSuccess(cartInfo));
  } catch (err) {
    yield put(cartActions.addFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { cartInfo } = yield take(cartConstants.REQUEST_ADD);
    yield call(requestAdd, cartInfo);
  }
}

export const cartSaga = [fork(watchRequestAdd)];
