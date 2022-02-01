import { combineReducers } from "redux";
import { signUpReducer } from "./signUpReducer";
import { loginReducer } from "./loginReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginReducer", "cartReducer"],
};

const rootReducer = combineReducers({
  loginReducer,
  signUpReducer,
  productReducer,
  cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
