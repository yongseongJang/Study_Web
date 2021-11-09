import axios from "axios";

const login = async (id: string, password: string): Promise<object> => {
  return await axios
    .post("/api/users/login", { id, password })
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
