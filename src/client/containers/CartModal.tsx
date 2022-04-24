import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartPagination, Spinner } from "../components";
import { RootState } from "../reducers/types";
import { loginSelectors } from "../selectors";
import { paginate } from "../utils/pagination";
import { IPagination } from "../interfaces";
import { cartActions, orderActions } from "../actions";
import { history } from "../utils/history";
import { List } from "immutable";
interface CartModalProps {
  isVisible: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function CartModal(props: CartModalProps) {
  const isRequesting = useSelector(
    (state: RootState) => state.cartReducer.isRequesting,
  );
  const cartInfo = useSelector(
    (state: RootState) => state.cartReducer.cartInfo,
  );
  const token = useSelector(loginSelectors.selectToken);

  const [pagination, setPagination] = useState<IPagination>(
    paginate(cartInfo.size),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(cartActions.requestCartProduct(token));
    }
  }, []);

  useEffect(() => {
    if (cartInfo.size > 0) {
      setPagination(paginate(cartInfo.size));
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
      setPagination(paginate(cartInfo.size, Number(page)));
    }
  };

  const handleOrderBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(orderActions.add(true));

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
              <strong>{cartInfo.size}</strong>
              {` 개`}
            </div>
            <ul className="content__item-list">
              {cartInfo &&
                List.isList(cartInfo) &&
                cartInfo
                  .toArray()
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
