import {
  IPagination,
  IProduct,
  ICartInfo,
  IShippingInfo,
  IOrderInfo,
} from "../interfaces";
export interface RootState {
  loginReducer: loginReducerState;
  signupReducer: signupReducerState;
  productReducer: productReducerState;
  cartReducer: cartReducerState;
  orderReducer: orderReducerState;
}

export interface signupReducerState {
  isRequesting: boolean;
  error: Error;
}

export interface loginReducerState {
  isRequesting: boolean;
  loginStatus: boolean;
  error: null | Error;
  token: string;
  email: string;
  userName: string;
}

export interface productReducerState {
  isRequesting: boolean;
  pagination: IPagination;
  productList: {
    product: Omit<
      IProduct,
      "productDetail" | "productImage" | "productCaution" | "productSize"
    >;
  }[];
  product: IProduct;
}

export interface cartReducerState {
  isRequesting: boolean;
  cartInfo: ICartInfo[];
}

export interface orderReducerState {
  isRequesting: boolean;
  isAllProduct: boolean;
  cartList: number[];
  shippingInfo: IShippingInfo;
  orderInfo: IOrderInfo[];
  nonMemberLogin: boolean;
  error: Error;
}
