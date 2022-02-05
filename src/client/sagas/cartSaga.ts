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

export function* requestRemoveAll() {
  try {
    yield put(cartActions.removeAllSuccess());
  } catch (err) {
    yield put(cartActions.removeAllFailure(err));
  }
}

export function* requestIncreaseQuantity(productId: number, option: string) {
  try {
    yield put(cartActions.increaseQuantitySuccess(productId, option));
  } catch (err) {
    yield put(cartActions.increaseQuantityFailure(err));
  }
}

export function* requestDecreaseQuantity(productId: number, option: string) {
  try {
    yield put(cartActions.decreaseQuantitySuccess(productId, option));
  } catch (err) {
    yield put(cartActions.decreaseQuantityFailure(err));
  }
}

export function* requestChangeQuantity(
  productId: number,
  option: string,
  quantity: number,
) {
  try {
    yield put(cartActions.changeQuantitySuccess(productId, option, quantity));
  } catch (err) {
    yield put(cartActions.changeQuantityFailure(err));
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

export function* watchRequestRemoveAll() {
  while (true) {
    yield take(cartConstants.REQUEST_REMOVE_ALL);
    yield call(requestRemoveAll);
  }
}

export function* watchRequestIncreaseQuantity() {
  while (true) {
    const { productId, option } = yield take(
      cartConstants.REQUEST_INCREASE_QUANTITY,
    );
    yield call(requestIncreaseQuantity, productId, option);
  }
}

export function* watchRequestDecreaseQuantity() {
  while (true) {
    const { productId, option } = yield take(
      cartConstants.REQUEST_DECREASE_QUANTITY,
    );
    yield call(requestDecreaseQuantity, productId, option);
  }
}

export function* watchRequestChangeQuantity() {
  while (true) {
    const { productId, option, quantity } = yield take(
      cartConstants.REQUEST_CHANGE_QUANTITY,
    );
    yield call(requestChangeQuantity, productId, option, quantity);
  }
}

export const cartSaga = [
  fork(watchRequestAdd),
  fork(watchRequestRemove),
  fork(watchRequestRemoveAll),
  fork(watchRequestIncreaseQuantity),
  fork(watchRequestDecreaseQuantity),
  fork(watchRequestChangeQuantity),
];
