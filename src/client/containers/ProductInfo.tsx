import * as React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginSelectors } from "../selectors";
import { productActions, cartActions, orderActions } from "../actions";
import {
  ProductDetail,
  ProductImage,
  ProductGuide,
  ProductOption,
  TopMenu,
} from "../components";
import { CartModal } from "../containers";
import { IOption, ICartInfo } from "../interfaces";
import { history } from "../utils/history";
import { productSelectors, cartSelectors } from "../selectors";
interface ProductInfoProps {
  category: string;
  productId: number;
}

function ProductInfo(props: ProductInfoProps) {
  const [browserWidth, setBrowserWidth] = useState<number>(
    window.innerHeight ? window.innerWidth : document.body.clientWidth,
  );
  const [isVisibleCart, setIsVisibleCart] = useState<boolean>(false);
  const [option, setOption] = useState<IOption>({});

  const dispatch = useDispatch();

  const [cookies] = useCookies();
  const token = cookies.uniformbridge_token;
  const product = useSelector(productSelectors.selectProductDetail);
  const productDetail = useSelector(productSelectors.selectProductDetails);
  const productImage = useSelector(productSelectors.selectProductImage);
  const productCaution = useSelector(productSelectors.selectProductCaution);
  const productSize = useSelector(productSelectors.selectProductSize);
  const cartInfo = useSelector(cartSelectors.selectCartInfo);

  let resizeTimer = setTimeout(() => {
    return 0;
  }, 0);
  const handleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      setBrowserWidth(
        window.innerHeight ? window.innerWidth : document.body.clientWidth,
      );
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    dispatch(
      productActions.requestProductDetail(props.category, props.productId),
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLeftBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const sizes = Object.keys(option);
    if (sizes.length > 0) {
      addToCart(sizes, token);

      dispatch(orderActions.add(false, [cartInfo.length]));

      history.replace("/order/payment");
    }
  };

  const handleRightBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const sizes = Object.keys(option);
    if (!isVisibleCart && sizes.length > 0) {
      addToCart(sizes, token);
    }

    setIsVisibleCart(!isVisibleCart);
  };

  const addToCart = (sizes: string[], token: string) => {
    const cartInfo: ICartInfo[] = [];

    sizes.forEach((size) => {
      cartInfo.push({
        productId: product._id,
        option: size,
        quantity: option[size],
        category: props.category.replace(/ /g, "_"),
        productInfo: {
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          image: product.image,
        },
      });
    });

    dispatch(cartActions.add(cartInfo, token));
  };
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
