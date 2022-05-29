import * as React from "react";
import { ProductInfo } from "../containers";
import { useProduct } from "../hooks";

interface ProductDetailProps {
  match: {
    params: {
      category: string;
      productId: string;
    };
    path: string;
    url: string;
    isExact: boolean;
  };
}

function Product(props: ProductDetailProps) {
  const { category, productId } = useProduct(props.match.params);

  return (
    <div className="product">
      <ProductInfo category={category} productId={productId}></ProductInfo>
    </div>
  );
}

export default Product;
