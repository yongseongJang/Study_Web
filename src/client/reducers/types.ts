import { IPagination, IProduct } from "../interfaces";
export interface RootState {
  loginReducer: loginReducerState;
  signupReducer: signupReducerState;
  productReducer: productReducerState;
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

export interface productReducerState {
  isRequesting: boolean;
  pagination: IPagination[];
  products: IProduct[];
}
