import { ICartInfo, IShippingInfo, IOrderInfo } from "../interfaces";
import { LoginState } from "./loginReducer";
import { SignUpState } from "./signUpReducer";
import { ProductState } from "./productReducer";
export interface RootState {
  loginReducer: LoginState;
  signupReducer: SignUpState;
  productReducer: ProductState;
  cartReducer: cartReducerState;
  orderReducer: orderReducerState;
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
