export interface RootState {
  signupReducer: signupReducerState;
}

export interface signupReducerState {
  isRequesting: boolean;
  error: Error;
}
