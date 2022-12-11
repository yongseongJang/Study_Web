import * as React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartPagination, Spinner } from "../components";
import { paginate } from "../utils/pagination";
import { IPagination } from "../interfaces";
import { cartActions } from "../reducers/cartReducer";
import { history } from "../utils/history";
import { cartSelectors } from "../selectors";
interface CartModalProps {
  isVisible: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function CartModal(props: CartModalProps) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "uniformbridge_token",
    "cartInfo",
    "isAllProduct",
  ]);
  const token = cookies.uniformbridge_token;
  const isRequesting = useSelector(cartSelectors.selectIsRequesting);
  const cartInfo = useSelector(cartSelectors.selectCartInfo);

  const [pagination, setPagination] = useState<IPagination>(
    paginate(cartInfo.length),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(cartActions.requestCartProduct({ token }));
    }
  }, []);

  useEffect(() => {
    if (cartInfo.length > 0) {
      if (token) {
        setCookie("cartInfo", JSON.stringify(cartInfo), { path: "/" });
      }

      setPagination(paginate(cartInfo.length));
    }
  }, [cartInfo]);

  const handleShopBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    props.onClick(e);
  };

  const handlePageClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const page = e.currentTarget.getAttribute("data-page");

    if (page) {
      setPagination(paginate(cartInfo.length, Number(page)));
    }
  };

  const handleOrderBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setCookie("isAllProduct", true, { path: "/" });

    history.replace("/order/payment");
  };

  return (
    <div
      className="cartModal"
      style={props.isVisible ? undefined : { display: "none" }}
    >
      <div className="cartModal__header">
        <h3>장바구니 담기</h3>
        <span className="header__closeBtn" onClick={props.onClick}>
          <span className="closeBtn__wrap">
            <span className="wrap__line1"></span>
            <span className="wrap__line2"></span>
          </span>
        </span>
      </div>
      <div className="cartModal__content">
        {isRequesting ? (
          <Spinner></Spinner>
        ) : (
          <>
            <div className="content__count">
              {`총 `}
              <strong>{cartInfo.length}</strong>
              {` 개`}
            </div>
            <ul className="content__item-list">
              {cartInfo &&
                Array.isArray(cartInfo) &&
                cartInfo
                  .slice(pagination.startIndex, pagination.endIndex + 1)
                  .map((info, index) => {
                    return <CartItem key={index} info={info}></CartItem>;
                  })}
            </ul>
            <CartPagination
              pagination={pagination}
              onClick={handlePageClick}
            ></CartPagination>
          </>
        )}
      </div>
      <div className="cartModal__button">
        <a
          href="/order/payment"
          className="button__order"
          onClick={handleOrderBtnClick}
        >
          바로 구매하기
        </a>
        <a href="/order/cart" className="button__cart">
          장바구니 이동
        </a>
        <a href="" className="button__shop" onClick={handleShopBtnClick}>
          쇼핑계속하기
        </a>
      </div>
    </div>
  );
}

export default CartModal;
