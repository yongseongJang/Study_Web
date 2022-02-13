import { take, call, put, fork } from "redux-saga/effects";
import { cartConstants, cartActions } from "../actions";
import { ICartInfo } from "../interfaces";
import { cartServices } from "../services";

export function* requestAdd(cartInfo: ICartInfo[], token?: string) {
  try {
    if (token) {
      yield call(cartServices.add, cartInfo, token);
    }

    yield put(cartActions.addSuccess(cartInfo));
  } catch (err) {
    yield put(cartActions.addFailure(err));
  }
}

export function* requestRemove(
  productId: number,
  option: string,
  token?: string,
) {
  try {
    if (token) {
      yield call(cartServices.remove, productId, option, token);
    }

    yield put(cartActions.removeSuccess(productId, option));
  } catch (err) {
    yield put(cartActions.removeFailure(err));
  }
}

export function* requestSelectRemove(
  selectInfo: Pick<ICartInfo, "productId" | "option">[],
  token?: string,
) {
  try {
    if (token) {
      yield call(cartServices.selectRemove, selectInfo, token);
    }
    yield put(cartActions.selectRemoveSuccess(selectInfo));
  } catch (err) {
    yield put(cartActions.selectRemoveFailure(err));
  }
}

export function* requestRemoveAll(token?: string) {
  try {
    if (token) {
      yield call(cartServices.removeAll, token);
    }

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

export function* requestCartProduct(token: string) {
  try {
    const { cartProduct } = yield call(cartServices.requestCartProduct, token);

    yield put(cartActions.requestCartProductSuccess(cartProduct));
  } catch (err) {
    yield put(cartActions.requestCartProductFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { cartInfo, token } = yield take(cartConstants.REQUEST_ADD);
    yield call(requestAdd, cartInfo, token);
  }
}

export function* watchRequestRemove() {
  while (true) {
    const { productId, option, token } = yield take(
      cartConstants.REQUEST_REMOVE,
    );
    yield call(requestRemove, productId, option, token);
  }
}

export function* watchRequestSelectRemove() {
  while (true) {
    const { selectInfo, token } = yield take(
      cartConstants.REQUEST_SELECT_REMOVE,
    );
    yield call(requestSelectRemove, selectInfo, token);
  }
}

export function* watchRequestRemoveAll() {
  while (true) {
    const { token } = yield take(cartConstants.REQUEST_REMOVE_ALL);
    yield call(requestRemoveAll, token);
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

export function* watchRequestCartProduct() {
  while (true) {
    const { token } = yield take(cartConstants.REQUEST_CART_PRODUCT);
    yield call(requestCartProduct, token);
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
];
