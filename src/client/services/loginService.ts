import axios from "axios";
import { ILoginInfo } from "../interfaces";

const login = async (loginInfo: ILoginInfo): Promise<object> => {
  return await axios
    .post(`${process.env.REACT_APP_API_URI}/api/users/login`, {
      loginInfo,
    })
    .then((res) => {
      const { token, authExpirationTime: expirationTime, userName } = res.data;
      return { token, expirationTime, userName };
    })
    .catch((err) => {
      throw err;
    });
};

export const loginServices = {
  login,
};
