import axios from "axios";
import { ICartInfo } from "../interfaces";

const add = (cartInfo: ICartInfo[], token: string) => {
  const extractedCartInfo = cartInfo.map((info) => {
    return {
      productId: info.productId,
      option: info.option,
      quantity: info.quantity,
    };
  });

  return axios
    .post(
      "/api/carts/",
      { cartInfo: extractedCartInfo },
      { headers: { authorization: "Bearer " + token } },
    )
    .catch((err) => {
      throw err;
    });
};

const remove = (productId: number, option: string, token: string) => {
  return axios
    .delete(`/api/carts/${productId}/${option}`, {
      headers: { authorization: "Bearer " + token },
    })
    .catch((err) => {
      throw err;
    });
};

const selectRemove = (
  selectInfo: Pick<ICartInfo, "productId" | "option">[],
  token: string,
) => {
  return axios
    .delete("/api/carts/products", {
      headers: { authorization: "Bearer " + token },
      data: { selectInfo },
    })
    .catch((err) => {
      throw err;
    });
};

const removeAll = (token: string) => {
  return axios
    .delete("/api/carts", { headers: { authorization: "Bearer " + token } })
    .catch((err) => {
      throw err;
    });
};

const requestCartProduct = (token: string) => {
  return axios
    .get("/api/carts", { headers: { authorization: "Bearer " + token } })
    .then((res) => {
      const { cartInfo } = res.data;
      return { cartInfo };
    })
    .catch((err) => {
      throw err;
    });
};

export const cartServices = {
  add,
  remove,
  selectRemove,
  removeAll,
  requestCartProduct,
};
