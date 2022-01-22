import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { productActions } from "../actions";
import {
  ProductDetail,
  ProductImage,
  ProductGuide,
  ProductOption,
} from "../components";

interface ProductInfoProps {
  category: string;
  productId: number;
}

function ProductInfo(props: ProductInfoProps) {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.productReducer);

  useEffect(() => {
    dispatch(
      productActions.requestProductDetail(props.category, props.productId),
    );
  }, []);

  return (
    <div className="productInfo">
      {product ? (
        <>
          <section className="productDetail__left">
            <ProductDetail
              brandName={props.category}
              productName={product.name}
              productDetail={product.productDetail}
            ></ProductDetail>
          </section>
          <section className="productDetail__center">
            <ProductImage productImage={product.productImage}></ProductImage>
          </section>
          <section className="productDetail__right">
            <ProductOption
              productName={product.name}
              price={product.price}
              salePrice={product.salePrice}
              productSize={product.productSize}
            ></ProductOption>
            <div className="right__order-wrap">
              <a href="">BUY NOW</a>
              <a href="">ADD TO CART</a>
            </div>
            <ProductGuide
              productCaution={product.productCaution}
            ></ProductGuide>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default ProductInfo;
