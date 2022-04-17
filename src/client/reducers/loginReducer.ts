import { Record } from "immutable";
import type { RecordOf } from "immutable";
import { loginConstants } from "../actions";

interface State {
  isRequesting: boolean;
  token: string;
  email: string;
  userName: string;
  error: string;
}

const defaultValues: State = {
  isRequesting: false,
  token: "",
  email: "",
  userName: "",
  error: "",
};

const makeLoginState: Record.Factory<State> = Record(defaultValues);

export type LoginState = RecordOf<State>;

const initialState: LoginState = makeLoginState();

export const loginReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return state.update("isRequesting", () => true);
    case loginConstants.LOGIN_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("token", () => action.token)
        .update("userName", () => action.userName);
    case loginConstants.LOGIN_FAILURE:
      return state
        .update("isRequesting", () => false)
        .update("error", () => action.err);
    case loginConstants.LOGOUT_REQUEST:
      return state.update("isRequesting", () => true);
    case loginConstants.LOGOUT_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("token", () => "")
        .update("userName", () => "");
    case loginConstants.RESET_ERROR:
      return state.update("error", () => "");
    default:
      return state;
  }
};
