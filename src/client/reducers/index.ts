import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "./signUpReducer";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  productReducer,
  cartReducer,
  orderReducer,
});

export default rootReducer;
