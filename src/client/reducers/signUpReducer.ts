import { Record } from "immutable";
import type { RecordOf } from "immutable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../interfaces";
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

export const signUpSlice = createSlice({
  name: "singUp",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<{ userInfo: IUserInfo }>) => {
      return state.update("isRequesting", () => true);
    },
    signUpSuccess: (state) => {
      return state.update("isRequesting", () => false);
    },
    signUpFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      const { err } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("error", () => err);
    },
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
