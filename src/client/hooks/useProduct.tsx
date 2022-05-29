import * as React from "react";

const useProduct = (params: { category: string; productId: string }) => {
  const category = params.category.replace(/_/g, " ");
  const productId = Number(params.productId);

  return { category, productId };
};

export default useProduct;
