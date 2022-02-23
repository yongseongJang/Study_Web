import { IPagination, IProduct, ICartInfo } from "../interfaces";
export interface RootState {
  loginReducer: loginReducerState;
  signupReducer: signupReducerState;
  productReducer: productReducerState;
  cartReducer: cartReducerState;
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
