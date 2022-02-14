import axios from "axios";

const login = async (id: string, pw: string): Promise<object> => {
  return await axios
    .post("/api/users/login", { loginInfo: { id, pw } })
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
