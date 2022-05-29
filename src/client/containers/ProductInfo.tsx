import * as React from "react";
import {
  ProductDetail,
  ProductImage,
  ProductGuide,
  ProductOption,
  TopMenu,
} from "../components";
import { CartModal } from "../containers";
import { useProductInfo } from "../hooks";
interface ProductInfoProps {
  category: string;
  productId: number;
}

function ProductInfo(props: ProductInfoProps) {
  const {
    product,
    productDetail,
    productSize,
    productImage,
    productCaution,
    browserWidth,
    option,
    isVisibleCart,
    setOption,
    handleLeftBtnClick,
    handleRightBtnClick,
  } = useProductInfo(props.category, props.productId);

  return (
    <div className="productInfo">
      <TopMenu />
      {product && (
        <>
          <section className="productInfo__image">
            <img
              src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${product.image}`}
              alt=""
            />
          </section>
          <section className="productInfo__left">
            <ProductDetail
              brandName={props.category}
              productName={product.name}
              productDetail={productDetail}
            ></ProductDetail>
          </section>
          <section className="productInfo__center">
            <ProductImage productImage={productImage}></ProductImage>
          </section>
          <section
            className="productInfo__right"
            style={{ inset: `0px auto auto ${browserWidth * 0.75}px` }}
          >
            <div className="right__wrap">
              <div className="wrap__contents">
                <div className="contents__box">
                  <ProductOption
                    productName={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    productSize={productSize}
                    option={option}
                    setOption={setOption}
                  ></ProductOption>
                  <div className="box__order-wrap">
                    <a
                      className="order-wrap__leftBtn"
                      href=""
                      onClick={handleLeftBtnClick}
                    >
                      BUY NOW
                    </a>
                    <a
                      className="order-wrap__rightBtn"
                      href=""
                      onClick={handleRightBtnClick}
                    >
                      ADD TO CART
                    </a>
                  </div>
                  <ProductGuide
                    productCaution={productCaution}
                    name={product.name}
                    size={product.size}
                  ></ProductGuide>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <CartModal
        isVisible={isVisibleCart}
        onClick={handleRightBtnClick}
      ></CartModal>
    </div>
  );
}

export default ProductInfo;
