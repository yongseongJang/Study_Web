import { signupConstants } from "../actions";

const initialState = {
  isRequesting: false,
  error: null,
};

export const signupReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  switch (action.type) {
    case signupConstants.SIGNUP_REQUEST:
      return { ...state, isRequesting: true, error: null };
    case signupConstants.SIGNUP_SUCCESS:
      return { ...state, isRequesting: false, error: null };
    case signupConstants.SIGNUP_FAILURE:
      return { ...state, isRequesting: false, error: action.err };
    default:
      return state;
  }
};
