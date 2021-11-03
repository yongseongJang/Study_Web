import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUpSaga";

function* rootSaga() {
  yield all([...signUpSaga]);
}

export default rootSaga;
