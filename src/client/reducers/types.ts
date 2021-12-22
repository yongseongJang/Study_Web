export interface RootState {
  loginReducer: loginReducerState;
  signupReducer: signupReducerState;
}

export interface signupReducerState {
  isRequesting: boolean;
  error: Error;
}

export interface loginReducerState {
  isRequesting: boolean;
  loginStatus: boolean;
  error: null;
  token: string;
  email: string;
  userName: string;
}
