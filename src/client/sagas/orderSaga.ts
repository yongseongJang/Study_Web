import { take, call, put, fork } from "redux-saga/effects";
import { orderConstants, orderActions } from "../actions";
import { orderServices } from "../services/orderService";

export function* requestAdd(isAllProduct: boolean, cartList: number[]) {
  try {
    yield put(orderActions.addSuccess(isAllProduct, cartList));
  } catch (err) {
    yield put(orderActions.addFailure(err));
  }
}

export function* requestShippingInfo(token: string) {
  try {
    const { shippingInfo } = yield call(
      orderServices.requestShippingInfo,
      token,
    );

    yield put(orderActions.requestShippingInfoSuccess(shippingInfo));
  } catch (err) {
    yield put(orderActions.requestShippingInfoFailure(err));
  }
}

export function* requestMemberOrderInfo(token: string) {
  try {
    const { orderInfo } = yield call(
      orderServices.requestMemberOrderInfo,
      token,
    );

    yield put(orderActions.requestMemberOrderInfoSuccess(orderInfo));
  } catch (err) {
    yield put(orderActions.requestMemberOrderInfoFailure(err));
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

export function* watchRequestShippingInfo() {
  while (true) {
    const { token } = yield take(orderConstants.REQUEST_SHIPPING_INFO);

    yield call(requestShippingInfo, token);
  }
}

export function* watchRequestMemberOrderInfo() {
  while (true) {
    const { token } = yield take(orderConstants.REQUEST_MEMBER_ORDER_INFO);

    yield call(requestMemberOrderInfo, token);
  }
}

export const orderSaga = [
  fork(watchRequestAdd),
  fork(watchRequestShippingInfo),
  fork(watchRequestMemberOrderInfo),
];
