import { take, call, put, fork } from "redux-saga/effects";
import { orderConstants, orderActions } from "../actions";

export function* requestAdd(isAllProduct: boolean, cartList: number[]) {
  try {
    console.log(isAllProduct, cartList);
    yield put(orderActions.addSuccess(isAllProduct, cartList));
  } catch (err) {
    yield put(orderActions.addFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { isAllProduct, cartList } = yield take(
      orderConstants.REQUEST_ORDER_ADD,
    );

    yield call(requestAdd, isAllProduct, cartList);
  }
}

export const orderSaga = [fork(watchRequestAdd)];
