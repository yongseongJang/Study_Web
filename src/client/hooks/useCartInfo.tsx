import * as React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../actions";
import { ICartInfo } from "../interfaces";
import { history } from "../utils/history";
import { cartSelectors } from "../selectors";

const useCartInfo = () => {
  const dispatch = useDispatch();

  const cartAttributes = [
    "이미지",
    "상품정보",
    "수량",
    "상품구매금액",
    "할인금액",
    "적립금",
    "배송구분",
    "배송비",
    "선택",
  ];

  const [cookies, setCookie, removeCookie] = useCookies([
    "uniformbridge_token",
    "cartInfo",
    "cartList",
    "isAllProduct",
  ]);
  const token = cookies.uniformbridge_token;

  const isRequesting = useSelector(cartSelectors.selectIsRequesting);
  const cartInfo = useSelector(cartSelectors.selectCartInfo);

  useEffect(() => {
    if (token) {
      dispatch(cartActions.requestCartProduct(token));
    } else {
      dispatch(cartActions.setCartProduct(cookies.cartInfo));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setCookie("cartInfo", JSON.stringify(cartInfo), { path: "/" });
    }
  }, [cartInfo]);

  const [selectAllState, setSelectAllState] = useState<boolean>(false);
  const [checkBoxState, setCheckBoxState] = useState<boolean[]>(
    Array(cartInfo ? cartInfo.length : 0).fill(false),
  );

  const totalPrice =
    cartInfo &&
    cartInfo.reduce((acc, info) => {
      return acc + info.productInfo.price * info.quantity;
    }, 0);
  const totalSalePrice =
    cartInfo &&
    cartInfo.reduce((acc, info) => {
      return info.productInfo.salePrice
        ? acc +
            (info.productInfo.price - info.productInfo.salePrice) *
              info.quantity
        : acc;
    }, 0);

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = e.currentTarget;
    const productId = target.getAttribute("data-id");
    const option = target.getAttribute("data-option");

    if (productId && option) {
      dispatch(cartActions.remove(Number(productId), option, token));
    }
  };

  const handleSelectRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const selectInfo: Pick<ICartInfo, "productId" | "option">[] = [];

    cartInfo.forEach((info, index) => {
      if (checkBoxState[index]) {
        selectInfo.push({ productId: info.productId, option: info.option });
      }
    });

    dispatch(cartActions.selectRemove(selectInfo, token));

    setCheckBoxState(Array(cartInfo.length - selectInfo.length).fill(false));
    setSelectAllState(false);
  };

  const handleRemoveAllClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (selectAllState) {
      setSelectAllState(false);
      setCheckBoxState([]);
    }
    dispatch(cartActions.removeAll(token));
  };

  const handleIncreaseQuantityClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.currentTarget.parentElement) {
      const productId = e.currentTarget.parentElement.getAttribute("data-id");
      const option = e.currentTarget.parentElement.getAttribute("data-option");

      if (productId && option) {
        dispatch(cartActions.increaseQuantity(Number(productId), option));
      }
    }
  };

  const handleDecreaseQuantityClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.currentTarget.parentElement) {
      const productId = e.currentTarget.parentElement.getAttribute("data-id");
      const option = e.currentTarget.parentElement.getAttribute("data-option");
      const quantity =
        e.currentTarget.parentElement.getAttribute("data-quantity");

      if (productId && option && quantity && Number(quantity) > 1) {
        dispatch(cartActions.decreaseQuantity(Number(productId), option));
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.parentElement) {
      const productId = e.currentTarget.parentElement.getAttribute("data-id");
      const option = e.currentTarget.parentElement.getAttribute("data-option");

      const value = e.target.value.replace(/[^0-9]/g, "");
      const inputValue = value === "" ? 1 : Number(value);

      if (productId && option) {
        dispatch(
          cartActions.changeQuantity(Number(productId), option, inputValue),
        );
      }
    }
  };

  const handleSelectAllStateChange = () => {
    setCheckBoxState(Array(cartInfo.length).fill(!selectAllState));
    setSelectAllState(!selectAllState);
  };

  const handleCheckBoxStateChange = (e: React.ChangeEvent) => {
    const index = e.currentTarget.getAttribute("data-index")
      ? Number(e.currentTarget.getAttribute("data-index"))
      : null;

    if (index !== null) {
      if (selectAllState && checkBoxState[Number(index)]) {
        setSelectAllState(false);
      }

      setCheckBoxState([
        ...checkBoxState.slice(0, index),
        !checkBoxState[index],
        ...checkBoxState.slice(index + 1),
      ]);
    }
  };

  const handleOrderAllBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartInfo.length > 0) {
      setCookie("isAllProduct", true, { path: "/" });

      history.replace("/order/payment");
    }
  };

  const handleSelectedOrderBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const cartList: number[] = [];
    if (selectAllState) {
      setCookie("isAllProduct", true, { path: "/" });
    } else if (checkBoxState.length > 0) {
      checkBoxState.forEach((state, index) => {
        if (state) {
          cartList.push(index);
        }
      });

      if (cartList.length > 0) {
        removeCookie("isAllProduct", { path: "/" });
        setCookie("cartList", JSON.stringify(cartList), { path: "/" });
      }
    }

    if (selectAllState || cartList.length > 0) {
      history.replace("/order/payment");
    }
  };

  return {
    isRequesting,
    cartInfo,
    cartAttributes,
    handleRemoveClick,
    handleIncreaseQuantityClick,
    handleDecreaseQuantityClick,
    handleQuantityChange,
    selectAllState,
    handleSelectAllStateChange,
    checkBoxState,
    handleCheckBoxStateChange,
    handleSelectRemoveClick,
    handleRemoveAllClick,
    totalSalePrice,
    totalPrice,
    handleOrderAllBtnClick,
    handleSelectedOrderBtnClick,
  };
};

export default useCartInfo;
