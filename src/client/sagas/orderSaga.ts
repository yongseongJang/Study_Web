import { take, call, put, fork } from "redux-saga/effects";
import { orderConstants, orderActions } from "../actions";
import { orderServices } from "../services/orderService";
import { history } from "../utils/history";
import { INonMemberInfo, IPaymentInfo } from "../interfaces";

export function* requestAdd(payload: {
  isAllProduct: boolean;
  cartList: number[];
}) {
  try {
    const { isAllProduct, cartList } = payload;
    yield put(orderActions.addSuccess(isAllProduct, cartList));
  } catch (err) {
    yield put(orderActions.addFailure(err));
  }
}

export function* requestShippingInfo(payload: { token: string }) {
  try {
    const { shippingInfo } = yield call(
      orderServices.requestShippingInfo,
      payload.token,
    );

    yield put(orderActions.requestShippingInfoSuccess(shippingInfo));
  } catch (err) {
    yield put(orderActions.requestShippingInfoFailure(err));
  }
}

export function* requestMemberOrderInfo(payload: { token: string }) {
  try {
    const { orderInfo } = yield call(
      orderServices.requestMemberOrderInfo,
      payload.token,
    );

    yield put(orderActions.requestMemberOrderInfoSuccess(orderInfo));
  } catch (err) {
    yield put(orderActions.requestMemberOrderInfoFailure(err));
  }
}

export function* requestNonMemberOrderInfo(payload: {
  nonMemberInfo: INonMemberInfo;
}) {
  try {
    const { orderInfo } = yield call(
      orderServices.requestNonMemberOrderInfo,
      payload.nonMemberInfo,
    );

    yield put(orderActions.requestNonMemberOrderInfoSuccess(orderInfo));

    history.replace("/order/list");
  } catch (err) {
    yield put(orderActions.requestNonMemberOrderInfoFailure(err));
  }
}

export function* requestMemberPayment(payload: {
  paymentInfo: IPaymentInfo;
  token: string;
}) {
  try {
    const { paymentInfo, token } = payload;
    yield call(orderServices.requestMemberPayment, paymentInfo, token);

    yield put(orderActions.requestMemberPaymentSuccess());

    history.replace("/");
  } catch (err) {
    yield put(orderActions.requestMemberPaymentFailure(err));
  }
}

export function* requestNonMemberPayment(payload: {
  paymentInfo: IPaymentInfo;
}) {
  try {
    yield call(orderServices.requestNonMemberPayment, payload.paymentInfo);

    yield put(orderActions.requestNonMemberPaymentSuccess());

    history.replace("/");
  } catch (err) {
    yield put(orderActions.requestNonMemberPaymentFailure(err));
  }
}

export function* watchRequestAdd() {
  while (true) {
    const { payload } = yield take(orderConstants.REQUEST_ORDER_ADD);

    yield call(requestAdd, payload);
  }
}

export function* watchRequestShippingInfo() {
  while (true) {
    const { payload } = yield take(orderConstants.REQUEST_SHIPPING_INFO);

    yield call(requestShippingInfo, payload);
  }
}

export function* watchRequestMemberOrderInfo() {
  while (true) {
    const { payload } = yield take(orderConstants.REQUEST_MEMBER_ORDER_INFO);

    yield call(requestMemberOrderInfo, payload);
  }
}

export function* watchRequestNonMemberOrderInfo() {
  while (true) {
    const { payload } = yield take(
      orderConstants.REQUEST_NON_MEMBER_ORDER_INFO,
    );

    yield call(requestNonMemberOrderInfo, payload);
  }
}

export function* watchRequestMemberPayment() {
  while (true) {
    const { payload } = yield take(orderConstants.REQUEST_MEMBER_PAYMENT);

    yield call(requestMemberPayment, payload);
  }
}

export function* watchRequestNonMemberPayment() {
  while (true) {
    const { payload } = yield take(orderConstants.REQUEST_NON_MEMBER_PAYMENT);

    yield call(requestNonMemberPayment, payload);
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
