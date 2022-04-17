import { take, call, put, fork } from "redux-saga/effects";
import { orderConstants, orderActions } from "../actions";
import { orderServices } from "../services/orderService";
import { history } from "../utils/history";
import { INonMemberInfo, IPaymentInfo } from "../interfaces";

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

export function* requestNonMemberOrderInfo(nonMemberInfo: INonMemberInfo) {
  try {
    const { orderInfo } = yield call(
      orderServices.requestNonMemberOrderInfo,
      nonMemberInfo,
    );

    yield put(orderActions.requestNonMemberOrderInfoSuccess(orderInfo));

    history.replace("/order/list");
  } catch (err) {
    yield put(orderActions.requestNonMemberOrderInfoFailure(err));
  }
}

export function* requestMemberPayment(
  paymentInfo: IPaymentInfo,
  token: string,
) {
  try {
    yield call(orderServices.requestMemberPayment, paymentInfo, token);

    yield put(orderActions.requestMemberPaymentSuccess());

    history.replace("/");
  } catch (err) {
    yield put(orderActions.requestMemberPaymentFailure(err));
  }
}

export function* requestNonMemberPayment(paymentInfo: IPaymentInfo) {
  try {
    yield call(orderServices.requestNonMemberPayment, paymentInfo);

    yield put(orderActions.requestNonMemberPaymentSuccess());

    history.replace("/");
  } catch (err) {
    yield put(orderActions.requestNonMemberPaymentFailure(err));
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

export function* watchRequestNonMemberOrderInfo() {
  while (true) {
    const { nonMemberInfo } = yield take(
      orderConstants.REQUEST_NON_MEMBER_ORDER_INFO,
    );

    yield call(requestNonMemberOrderInfo, nonMemberInfo);
  }
}

export function* watchRequestMemberPayment() {
  while (true) {
    const { paymentInfo, token } = yield take(
      orderConstants.REQUEST_MEMBER_PAYMENT,
    );

    yield call(requestMemberPayment, paymentInfo, token);
  }
}

export function* watchRequestNonMemberPayment() {
  while (true) {
    const { paymentInfo } = yield take(
      orderConstants.REQUEST_NON_MEMBER_PAYMENT,
    );

    yield call(requestNonMemberPayment, paymentInfo);
  }
}

export const orderSaga = [
  fork(watchRequestAdd),
  fork(watchRequestShippingInfo),
  fork(watchRequestMemberOrderInfo),
  fork(watchRequestNonMemberOrderInfo),
  fork(watchRequestMemberPayment),
  fork(watchRequestNonMemberPayment),
];
