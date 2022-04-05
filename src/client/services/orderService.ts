import axios from "axios";
import { INonMemberInfo } from "../interfaces";

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

const requestNonMemberOrderInfo = (nonMemberInfo: INonMemberInfo) => {
  return axios
    .post(`${process.env.REACT_APP_API_URI}/api/orders/details`, {
      nonMemberInfo,
    })
    .then((res) => {
      const { orderInfo } = res.data;

      console.log(orderInfo);

      return { orderInfo };
    })
    .catch((err) => {
      throw err;
    });
};

export const orderServices = {
  requestShippingInfo,
  requestMemberOrderInfo,
  requestNonMemberOrderInfo,
};
