import axios from "axios";
import { IUserInfo } from "../interfaces";

const signUp = (userInfo: IUserInfo) => {
  return axios
    .post(`${process.env.REACT_APP_API_URI}/api/users`, { userInfo: userInfo })
    .catch((err) => {
      throw err;
    });
};

export const signUpServices = {
  signUp,
};
