import axios from "axios";
import { IUserDto } from "../interfaces";

const signUp = (userDto: IUserDto) => {
  return axios
    .post(`${process.env.REACT_APP_API_URI}/api/users`, { userInfo: userDto })
    .catch((err) => {
      throw err;
    });
};

export const signUpServices = {
  signUp,
};
