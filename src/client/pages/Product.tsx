import * as React from "react";
import { ProductInfo } from "../containers";

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
  const category = props.match.params.category.replace(/_/g, " ");
  const productId = Number(props.match.params.productId);

  return (
    <div className="product">
      <ProductInfo category={category} productId={productId}></ProductInfo>
    </div>
  );
}

export default Product;
