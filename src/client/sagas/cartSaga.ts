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

export function* requestRemove(productId: number, option: string) {
  try {
    yield put(cartActions.removeSuccess(productId, option));
  } catch (err) {
    yield put(cartActions.removeFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { cartInfo } = yield take(cartConstants.REQUEST_ADD);
    yield call(requestAdd, cartInfo);
  }
}

export function* watchRequestRemove() {
  while (true) {
    const { productId, option } = yield take(cartConstants.REQUEST_REMOVE);
    yield call(requestRemove, productId, option);
  }
}

export const cartSaga = [fork(watchRequestAdd), fork(watchRequestRemove)];
