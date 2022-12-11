import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IOrderInfo, IShippingInfo, IPaymentInfo, INonMemberInfo } from "../interfaces";

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ isAllProduct: boolean; cartList?: number[] }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    addSuccess: (
      state,
      action: PayloadAction<{ isAllProduct: boolean; cartList?: number[] }>,
    ) => {
      const { isAllProduct, cartList } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("isAllProduct", () => isAllProduct)
        .update("cartList", () => cartList || []);
    },
    addFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    requestShippingInfo: (state, action: PayloadAction<{ token: string }>) => {
      return state.update("isRequesting", () => true).update("error", () => "");
    },
    requestShippingInfoSuccess: (
      state,
      action: PayloadAction<{ shippingInfo: IShippingInfo }>,
    ) => {
      const { shippingInfo } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("shippingInfo", () => shippingInfo)
        .update("error", () => "");
    },
    requestShippingInfoFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state
        .update("isRequesting", () => false)
        .update("shippingInfo", () => null)
        .update("error", () => "");
    },
    requestMemberOrderInfo: (
      state,
      action: PayloadAction<{ token: string }>,
    ) => {
      return state.update("isRequesting", () => true).update("error", () => "");
    },
    requestMemberOrderInfoSuccess: (
      state,
      action: PayloadAction<{ orderInfo: IOrderInfo[] }>,
    ) => {
      const { orderInfo } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List(orderInfo))
        .update("error", () => "");
    },
    requestMemberOrderInfoFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      const { err } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List())
        .update("error", () => err);
    },
    requestNonMemberOrderInfo: (
      state,
      action: PayloadAction<{ nonMemberInfo: INonMemberInfo }>,
    ) => {
      return state
        .update("isRequesting", () => true)
        .update("nonMemberLogin", () => false)
        .update("error", () => "");
    },
    requestNonMemberOrderInfoSuccess: (
      state,
      action: PayloadAction<{ orderInfo: IOrderInfo[] }>,
    ) => {
      const { orderInfo } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List(orderInfo))
        .update("nonMemberLogin", () => true)
        .update("error", () => "");
    },
    requestNonMemberOrderInfoFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      const { err } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("orderInfo", () => List())
        .update("nonMemberLogin", () => false)
        .update("error", () => err);
    },
    requestMemberPayment: (
      state,
      action: PayloadAction<{ paymentInfo: IPaymentInfo; token: string }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    requestMemberPaymentSuccess: (state) => {
      return state.update("isRequesting", () => false);
    },
    requestMemberPaymentFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      const { err } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("error", () => err);
    },
    requestNonMemberPayment: (
      state,
      action: PayloadAction<{ paymentInfo: IPaymentInfo }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    requestNonMemberPaymentSuccess: (state) => {
      return state.update("isRequesting", () => false);
    },
    requestNonMemberPaymentFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      const { err } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("error", () => err);
    },
    resetError: (state) => {
      return state.update("error", () => "");
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
