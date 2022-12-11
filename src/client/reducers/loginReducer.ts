import { Record } from "immutable";
import type { RecordOf } from "immutable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginInfo } from "../interfaces";

interface State {
  isRequesting: boolean;
  token: string;
  expirationTime: number;
  email: string;
  userName: string;
  error: string;
}

const defaultValues: State = {
  isRequesting: false,
  token: "",
  expirationTime: 0,
  email: "",
  userName: "",
  error: "",
};

const makeLoginState: Record.Factory<State> = Record(defaultValues);

export type LoginState = RecordOf<State>;

const initialState: LoginState = makeLoginState();

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ loginInfo: ILoginInfo }>) => {
      return state.update("isRequesting", () => true);
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        expirationTime: number;
        userName: string;
      }>,
    ) => {
      const { token, expirationTime, userName } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("token", () => token)
        .update("expirationTime", () => expirationTime)
        .update("userName", () => userName);
    },
    loginFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      const { err } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("error", () => err);
    },
    logout: (state) => {
      return state.update("isRequesting", () => true);
    },
    logoutSuccess: (state) => {
      return state
        .update("isRequesting", () => false)
        .update("token", () => "")
        .update("expirationTime", () => 0)
        .update("userName", () => "");
    },
    resetError: (state) => {
      return state.update("error", () => "");
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
