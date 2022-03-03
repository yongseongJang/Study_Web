import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUpSaga";
import { loginSaga } from "./loginSaga";
import { productSaga } from "./productSaga";
import { cartSaga } from "./cartSaga";
import { orderSaga } from "./orderSaga";

function* rootSaga() {
  yield all([
    ...loginSaga,
    ...signUpSaga,
    ...productSaga,
    ...cartSaga,
    ...orderSaga,
  ]);
}

export default rootSaga;
