import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUpSaga";
import { loginSaga } from "./loginSaga";

function* rootSaga() {
  yield all([...loginSaga, ...signUpSaga]);
}

export default rootSaga;
