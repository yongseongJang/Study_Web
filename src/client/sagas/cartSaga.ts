import { take, call, put, fork } from "redux-saga/effects";
import { cartConstants, cartActions } from "../actions";
import { ICartInfo } from "../interfaces";
import { cartServices } from "../services";

export function* requestAdd(payload: {
  cartInfo: ICartInfo[];
  token?: string;
}) {
  try {
    const { cartInfo, token } = payload;
    if (token) {
      yield call(cartServices.add, cartInfo, token);
    }

    yield put(cartActions.addSuccess(cartInfo));
  } catch (err) {
    yield put(cartActions.addFailure(err));
  }
}

export function* requestRemove(payload: {
  productId: number;
  option: string;
  token?: string;
}) {
  try {
    const { productId, option, token } = payload;
    if (token) {
      yield call(cartServices.remove, productId, option, token);
    }

    yield put(cartActions.removeSuccess(productId, option));
  } catch (err) {
    yield put(cartActions.removeFailure(err));
  }
}

export function* requestSelectRemove(payload: {
  cartInfo: Pick<ICartInfo, "productId" | "option">[];
  token?: string;
}) {
  try {
    const { cartInfo, token } = payload;
    if (token) {
      yield call(cartServices.selectRemove, cartInfo, token);
    }
    yield put(cartActions.selectRemoveSuccess(cartInfo));
  } catch (err) {
    yield put(cartActions.selectRemoveFailure(err));
  }
}

export function* requestRemoveAll(payload: { token?: string }) {
  try {
    const { token } = payload;
    if (token) {
      yield call(cartServices.removeAll, token);
    }

    yield put(cartActions.removeAllSuccess());
  } catch (err) {
    yield put(cartActions.removeAllFailure(err));
  }
}

export function* requestIncreaseQuantity(payload: {
  productId: number;
  option: string;
}) {
  try {
    const { productId, option } = payload;
    yield put(cartActions.increaseQuantitySuccess(productId, option));
  } catch (err) {
    yield put(cartActions.increaseQuantityFailure(err));
  }
}

export function* requestDecreaseQuantity(payload: {
  productId: number;
  option: string;
}) {
  try {
    const { productId, option } = payload;
    yield put(cartActions.decreaseQuantitySuccess(productId, option));
  } catch (err) {
    yield put(cartActions.decreaseQuantityFailure(err));
  }
}

export function* requestChangeQuantity(payload: {
  productId: number;
  option: string;
  quantity: number;
}) {
  try {
    const { productId, option, quantity } = payload;
    yield put(cartActions.changeQuantitySuccess(productId, option, quantity));
  } catch (err) {
    yield put(cartActions.changeQuantityFailure(err));
  }
}

export function* requestCartProduct(payload: { token: string }) {
  try {
    const { token } = payload;

    const { cartInfo } = yield call(cartServices.requestCartProduct, token);

    yield put(cartActions.requestCartProductSuccess(cartInfo));
  } catch (err) {
    yield put(cartActions.requestCartProductFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_ADD);
    yield call(requestAdd, payload);
  }
}

export function* watchRequestRemove() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_REMOVE);
    yield call(requestRemove, payload);
  }
}

export function* watchRequestSelectRemove() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_SELECT_REMOVE);
    yield call(requestSelectRemove, payload);
  }
}

export function* watchRequestRemoveAll() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_REMOVE_ALL);
    yield call(requestRemoveAll, payload);
  }
}

export function* watchRequestIncreaseQuantity() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_INCREASE_QUANTITY);
    yield call(requestIncreaseQuantity, payload);
  }
}

export function* watchRequestDecreaseQuantity() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_DECREASE_QUANTITY);
    yield call(requestDecreaseQuantity, payload);
  }
}

export function* watchRequestChangeQuantity() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_CHANGE_QUANTITY);
    yield call(requestChangeQuantity, payload);
  }
}

export function* watchRequestCartProduct() {
  while (true) {
    const { payload } = yield take(cartConstants.REQUEST_CART_PRODUCT);
    yield call(requestCartProduct, payload);
  }
}

export const cartSaga = [
  fork(watchRequestAdd),
  fork(watchRequestRemove),
  fork(watchRequestSelectRemove),
  fork(watchRequestRemoveAll),
  fork(watchRequestIncreaseQuantity),
  fork(watchRequestDecreaseQuantity),
  fork(watchRequestChangeQuantity),
  fork(watchRequestCartProduct),
];
