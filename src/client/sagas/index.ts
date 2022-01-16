import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUpSaga";
import { loginSaga } from "./loginSaga";
import { productSaga } from "./productSaga";

function* rootSaga() {
  yield all([...loginSaga, ...signUpSaga, ...productSaga]);
}

export default rootSaga;
