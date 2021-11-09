import { loginConstants } from "../actions";

const initialState = {
  isRequesting: false,
  loginStatus: false,
  error: null,
  token: "",
  email: "",
  userName: "",
};

export const loginReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return { ...state, isRequesting: true };
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        loginStatus: true,
        error: null,
        token: action.token,
        id: action.id,
        userName: action.userName,
      };
    case loginConstants.LOGIN_FAILURE:
      return { ...state, isRequesting: false, error: action.err };
    case loginConstants.LOGOUT_REQUEST:
      return { ...state, isRequesting: true };
    case loginConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        loginStatus: false,
        error: null,
        token: "",
        id: "",
        userName: "",
      };
    default:
      return state;
  }
};
