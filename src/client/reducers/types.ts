import { LoginState } from "./loginReducer";
import { SignUpState } from "./signUpReducer";
import { ProductState } from "./productReducer";
import { CartState } from "./cartReducer";
import { OrderState } from "./orderReducer";
export interface RootState {
  loginReducer: LoginState;
  signupReducer: SignUpState;
  productReducer: ProductState;
  cartReducer: CartState;
  orderReducer: OrderState;
}
