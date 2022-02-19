import axios from "axios";

const getAllProducts = async (page: number) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URI}/api/products?page=${page}`)
    .then((res) => {
      const { pagination, paginatedProduct: productList } = res.data;
      return { pagination, productList };
    })
    .catch((err) => {
      throw err;
    });
};

const getProductsByCategory = async (category: string, page: number) => {
  return await axios
    .get(
      `${process.env.REACT_APP_API_URI}/api/products/${category}?page=${page}`,
    )
    .then((res) => {
      const { pagination, paginatedProduct: productList } = res.data;
      return { pagination, productList };
    })
    .catch((err) => {
      throw err;
    });
};

const getProductDetail = async (category: string, productId: number) => {
  return await axios
    .get(
      `${process.env.REACT_APP_API_URI}/api/products/${category}/${productId}`,
    )
    .then((res) => {
      const { product } = res.data;
      return { product };
    });
};

export const productServices = {
  getAllProducts,
  getProductsByCategory,
  getProductDetail,
};
