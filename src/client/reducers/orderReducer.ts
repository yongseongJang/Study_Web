import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { orderConstants } from "../actions";
import { IOrderInfo, IShippingInfo } from "../interfaces";

interface State {
  isRequesting: boolean;
  isAllProduct: boolean;
  cartList: List<number>;
  shippingInfo: IShippingInfo | null;
  orderInfo: List<IOrderInfo>;
  nonMemberLogin: boolean;
  error: string;
}

const defaultValues: State = {
  isRequesting: false,
  isAllProduct: false,
  cartList: List(),
  shippingInfo: null,
  orderInfo: List(),
  nonMemberLogin: false,
  error: "",
};

const makeOrderState: Record.Factory<State> = Record(defaultValues);

export type OrderState = RecordOf<State>;

const initialState: OrderState = makeOrderState();

export const orderReducer = (
  state = initialState,
  action: { type: string; payload: { [key: string]: any } },
) => {
  const payload = action.payload;

  switch (action.type) {
    case orderConstants.REQUEST_ORDER_ADD:
      return state.update("isRequesting", () => true);
    case orderConstants.SUCCESS_ORDER_ADD:
      return state
        .update("isRequesting", () => false)
        .update("isAllProduct", () => payload.isAllProduct)
        .update("cartList", () => (payload.cartList ? payload.cartList : []));
    case orderConstants.FAILURE_ORDER_ADD:
      return state.update("isRequesting", () => false);
    case orderConstants.REQUEST_SHIPPING_INFO:
      return state.update("isRequesting", () => true).update("error", () => "");
    case orderConstants.REQUEST_SHIPPING_INFO_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("shippingInfo", () => payload.shippingInfo)
        .update("error", () => "");
    case orderConstants.REQUEST_SHIPPING_INFO_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("shippingInfo", () => null)
        .update("error", () => "");
    case orderConstants.REQUEST_MEMBER_ORDER_INFO:
      return state.update("isRequesting", () => true).update("error", () => "");
    case orderConstants.REQUEST_MEMBER_ORDER_INFO_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List(payload.orderInfo))
        .update("error", () => "");
    case orderConstants.REQUEST_MEMBER_ORDER_INFO_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List())
        .update("error", () => payload.error);
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO:
      return state
        .update("isRequesting", () => true)
        .update("nonMemberLogin", () => false)
        .update("error", () => "");
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List(payload.orderInfo))
        .update("nonMemberLogin", () => true)
        .update("error", () => "");
    case orderConstants.REQUEST_NON_MEMBER_ORDER_INFO_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List())
        .update("nonMemberLogin", () => false)
        .update("error", () => payload.error);
    case orderConstants.REQUEST_MEMBER_PAYMENT:
      return state.update("isRequesting", () => true);
    case orderConstants.REQUEST_MEMBER_PAYMENT_SUCCESS:
      return state.update("isRequesting", () => true);
    case orderConstants.REQUEST_MEMBER_PAYMENT_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("error", () => payload.error);
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT:
      return state.update("isRequesting", () => true);
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT_SUCCESS:
      return state.update("isRequesting", () => true);
    case orderConstants.REQUEST_NON_MEMBER_PAYMENT_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("error", () => payload.error);
    case orderConstants.RESET_ERROR:
      return state.update("error", () => "");
    case orderConstants.RESET:
      return initialState;
    default:
      return state;
  }
};
