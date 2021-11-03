import { signUpConstants } from "../actions";

const initialState = {
  isRequesting: false,
  error: null,
};

export const signUpReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case signUpConstants.SIGNUP_REQUEST:
      return { ...state, isRequesting: true, error: null };
    case signUpConstants.SIGNUP_SUCCESS:
      return { ...state, isRequesting: false, error: null };
    case signUpConstants.SIGNUP_FAILURE:
      return { ...state, isRequesting: false, error: action.err };
    default:
      return state;
  }
};
