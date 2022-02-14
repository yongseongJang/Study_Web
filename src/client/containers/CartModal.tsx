import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartPagination } from "../components";
import { RootState } from "../reducers/types";
import { paginate } from "../utils/pagination";
import { IPagination } from "../interfaces";
import { cartActions } from "../actions";
interface CartModalProps {
  isVisible: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function CartModal(props: CartModalProps) {
  const { cartInfo } = useSelector((state: RootState) => state.cartReducer);
  const { token } = useSelector((state: RootState) => state.loginReducer);

  const [pagination, setPagination] = useState<IPagination>(
    paginate(cartInfo.length),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(cartActions.requestCartProduct(token));
    }
  }, []);

  useEffect(() => {
    if (cartInfo.length > 0) {
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
        <div className="content__count">
          {`총 `}
          <strong>{cartInfo.length}</strong>
          {` 개`}
        </div>
        <ul className="content__item-list">
          {cartInfo && Array.isArray(cartInfo)
            ? cartInfo
                .slice(pagination.startIndex, pagination.endIndex + 1)
                .map((info, index) => {
                  return <CartItem key={index} info={info}></CartItem>;
                })
            : null}
        </ul>
        <CartPagination
          pagination={pagination}
          onClick={handlePageClick}
        ></CartPagination>
      </div>
      <div className="cartModal__button">
        <a href="/order/order" className="button__order">
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
