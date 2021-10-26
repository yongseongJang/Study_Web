import { all } from "redux-saga/effects";
import { signupSaga } from "./signupSaga";

function* rootSaga() {
  yield all([...signupSaga]);
}

export default rootSaga;
