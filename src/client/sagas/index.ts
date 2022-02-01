import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUpSaga";
import { loginSaga } from "./loginSaga";
import { productSaga } from "./productSaga";
import { cartSaga } from "./cartSaga";

function* rootSaga() {
  yield all([...loginSaga, ...signUpSaga, ...productSaga, ...cartSaga]);
}

export default rootSaga;
