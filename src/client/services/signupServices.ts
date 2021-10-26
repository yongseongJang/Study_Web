import axios from "axios";
import { IUserInfo } from "../interfaces";

const signup = (userInfo: IUserInfo) => {
  return axios.post("/api/users", { userInfo }).catch((err) => {
    throw err;
  });
};

export const signupServices = {
  signup,
};
