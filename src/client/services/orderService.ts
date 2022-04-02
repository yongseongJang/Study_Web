import axios from "axios";

const requestShippingInfo = (token: string) => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/api/users/shipping`, {
      headers: { authorization: "Bearer " + token },
    })
    .then((res) => {
      const { shippingInfo } = res.data;

      return { shippingInfo };
    })
    .catch((err) => {
      throw err;
    });
};

const requestMemberOrderInfo = (token: string) => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/api/orders/member`, {
      headers: { authorization: "Bearer " + token },
    })
    .then((res) => {
      const { orderInfo } = res.data;

      return { orderInfo };
    })
    .catch((err) => {
      throw err;
    });
};

export const orderServices = {
  requestShippingInfo,
  requestMemberOrderInfo,
};
