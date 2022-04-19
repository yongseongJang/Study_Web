import { Record } from "immutable";
import type { RecordOf } from "immutable";
import { signUpConstants } from "../actions";

interface State {
  isRequesting: boolean;
  error: string;
}

const defaultValues: State = {
  isRequesting: false,
  error: "",
};

const makeSignUpState: Record.Factory<State> = Record(defaultValues);

export type SignUpState = RecordOf<State>;

const initialState: SignUpState = makeSignUpState();

export const signUpReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case signUpConstants.SIGNUP_REQUEST:
      return state.update("isRequesting", () => true);
    case signUpConstants.SIGNUP_SUCCESS:
      return state.update("isRequesting", () => false);
    case signUpConstants.SIGNUP_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("error", () => action.err);
    default:
      return state;
  }
};
