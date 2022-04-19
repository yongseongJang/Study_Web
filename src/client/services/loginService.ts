import axios from "axios";
import { ILoginDto } from "../interfaces";

const login = async (loginDto: ILoginDto): Promise<object> => {
  return await axios
    .post(`${process.env.REACT_APP_API_URI}/api/users/login`, {
      loginInfo: loginDto,
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
