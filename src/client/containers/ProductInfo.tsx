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
  TopMenu,
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
      <TopMenu />
      {product ? (
        <>
          <section className="productInfo__left">
            <ProductDetail
              brandName={props.category}
              productName={product.name}
              productDetail={product.productDetail}
            ></ProductDetail>
          </section>
          <section className="productInfo__center">
            <ProductImage productImage={product.productImage}></ProductImage>
          </section>
          <section className="productInfo__right">
            <div className="right__wrap">
              <div className="wrap__contents">
                <div className="contents__box">
                  <ProductOption
                    productName={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    productSize={product.productSize}
                  ></ProductOption>
                  <div className="box__order-wrap">
                    <a className="order-wrap__leftBtn" href="">
                      BUY NOW
                    </a>
                    <a className="order-wrap__rightBtn" href="">
                      ADD TO CART
                    </a>
                  </div>
                  <ProductGuide
                    productCaution={product.productCaution}
                  ></ProductGuide>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default ProductInfo;
