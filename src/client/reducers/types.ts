import { IShippingInfo, IOrderInfo } from "../interfaces";
import { LoginState } from "./loginReducer";
import { SignUpState } from "./signUpReducer";
import { ProductState } from "./productReducer";
import { CartState } from "./cartReducer";
export interface RootState {
  loginReducer: LoginState;
  signupReducer: SignUpState;
  productReducer: ProductState;
  cartReducer: CartState;
  orderReducer: orderReducerState;
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
