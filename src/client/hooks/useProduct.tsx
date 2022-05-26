import * as React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { productActions, cartActions } from "../actions";
import { IOption, ICartInfo } from "../interfaces";
import { history } from "../utils/history";
import { productSelectors, cartSelectors } from "../selectors";

const useProduct = (category: string, productId: number) => {
  const [browserWidth, setBrowserWidth] = useState<number>(
    window.innerHeight ? window.innerWidth : document.body.clientWidth,
  );
  const [isVisibleCart, setIsVisibleCart] = useState<boolean>(false);
  const [option, setOption] = useState<IOption>({});

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies([
    "uniformbridge_token",
    "cartInfo",
    "cartList",
    "isAllProduct",
  ]);
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

    dispatch(productActions.requestProductDetail(category, productId));

    if (!token) {
      dispatch(cartActions.setCartProduct(cookies.cartInfo));
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!token && cartInfo.length) {
      setCookie("cartInfo", JSON.stringify(cartInfo), { path: "/" });
    }
  }, [cartInfo]);

  const handleLeftBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const sizes = Object.keys(option);
    if (sizes.length > 0) {
      addToCart(sizes, token);

      removeCookie("isAllProduct", { path: "/" });
      setCookie("cartList", JSON.stringify([cartInfo.length]), { path: "/" });

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
    const tmp: ICartInfo[] = [];

    sizes.forEach((size) => {
      tmp.push({
        productId: product._id,
        option: size,
        quantity: option[size],
        category: category.replace(/ /g, "_"),
        productInfo: {
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          image: product.image,
        },
      });
    });

    setCookie("cartInfo", JSON.stringify([...cartInfo, ...tmp]), { path: "/" });
    dispatch(cartActions.add(tmp, token));
  };

  return {
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
  };
};

export default useProduct;
