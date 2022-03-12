import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, orderActions } from "../actions";
import { CartTable, Spinner } from "../components";
import { ICartInfo } from "../interfaces";
import { RootState } from "../reducers/types";
import { history } from "../utils/history";

function CartInfo() {
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

  const isRequesting = useSelector(
    (state: RootState) => state.cartReducer.isRequesting,
  );
  const cartInfo = useSelector(
    (state: RootState) => state.cartReducer.cartInfo,
  );
  const token = useSelector((state: RootState) => state.loginReducer.token);

  useEffect(() => {
    if (token) {
      dispatch(cartActions.requestCartProduct(token));
    }
  }, []);

  const [selectAllState, setSelectAllState] = useState<boolean>(false);
  const [checkBoxState, setCheckBoxState] = useState<boolean[]>(
    Array(cartInfo.length).fill(false),
  );

  const totalPrice = cartInfo.reduce((acc, info) => {
    return acc + info.productInfo.price * info.quantity;
  }, 0);
  const totalSalePrice = cartInfo.reduce((acc, info) => {
    return info.productInfo.salePrice
      ? acc +
          (info.productInfo.price - info.productInfo.salePrice) * info.quantity
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
      dispatch(orderActions.add(true));

      history.replace("/order/payment");
    }
  };

  const handleSelectedOrderBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const cartList: number[] = [];
    if (selectAllState) {
      dispatch(orderActions.add(true));
    } else if (checkBoxState.length > 0) {
      checkBoxState.forEach((state, index) => {
        if (state) {
          cartList.push(index);
        }
      });

      if (cartList.length > 0) {
        dispatch(orderActions.add(false, cartList));
      }
    }

    if (selectAllState || cartList.length > 0) {
      history.replace("/order/payment");
    }
  };

  return (
    <div className="CartInfo">
      {isRequesting ? (
        <div className="CartInfo__Spinner">
          <Spinner></Spinner>
        </div>
      ) : (
        <>
          {cartInfo.length > 0 ? (
            <React.Fragment>
              <section>
                <CartTable
                  attributes={cartAttributes}
                  instances={cartInfo}
                  onRemoveClick={handleRemoveClick}
                  onIncreaseClick={handleIncreaseQuantityClick}
                  onDecreaseClick={handleDecreaseQuantityClick}
                  onQuantityChange={handleQuantityChange}
                  selectAllState={selectAllState}
                  onSelectAllStateChange={handleSelectAllStateChange}
                  checkBoxState={checkBoxState}
                  onCheckBoxStateChange={handleCheckBoxStateChange}
                ></CartTable>
              </section>
              <section>
                <div className="section-wrap__remove-product">
                  <span className="remove-product__leftBtn">
                    <strong>선택상품을</strong>
                    <a
                      href=""
                      className="leftBtn__remove"
                      onClick={handleSelectRemoveClick}
                    >
                      <i className="icon-delete"></i>삭제하기
                    </a>
                  </span>
                  <span className="remove-product__rightBtn">
                    <a
                      href=""
                      className="rightBtn__remove"
                      onClick={handleRemoveAllClick}
                    >
                      장바구니비우기
                    </a>
                  </span>
                </div>
              </section>
              <section className="section-wrap__total-summary">
                <table>
                  <colgroup>
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "19%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "auto" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <strong>총 상품금액</strong>
                      </th>
                      <th scope="col">
                        <strong>총 배송비</strong>
                      </th>
                      <th
                        scope="col"
                        style={totalSalePrice ? undefined : { display: "none" }}
                      >
                        <strong>총 할인금액</strong>
                      </th>
                      <th scope="col">
                        <strong>결제예정금액</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <strong>
                            {`KRW `}
                            <span>{totalPrice}</span>
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{`+ `}</strong>
                          <strong>
                            {`KRW `}
                            <span>0</span>
                          </strong>
                        </div>
                      </td>
                      <td
                        style={totalSalePrice ? undefined : { display: "none" }}
                      >
                        <div>
                          <strong>{`- `}</strong>
                          <strong>
                            {`KRW `}
                            <span>{totalSalePrice}</span>
                          </strong>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{`= `}</strong>
                          <strong>
                            {`KRW `}
                            <span>{totalPrice - totalSalePrice}</span>
                          </strong>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </React.Fragment>
          ) : (
            <section className="section-wrap__empty-cart">
              장바구니가 비어 있습니다.
            </section>
          )}
        </>
      )}
      <section className="section-wrap__btn-wrap">
        <a
          href="/order/payment"
          className="btn-wrap__order-all"
          onClick={handleOrderAllBtnClick}
        >
          전체상품주문
        </a>
        <a
          href="/order/payment"
          className="btn-wrap__order-selected"
          onClick={handleSelectedOrderBtnClick}
        >
          선택상품주문
        </a>
        <span>
          <a href="/products/all_product" className="btn-wrap__shop">
            쇼핑계속하기
          </a>
        </span>
      </section>
    </div>
  );
}

export default CartInfo;
