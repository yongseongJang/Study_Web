import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../actions";
import { Table } from "../components";
import { RootState } from "../reducers/types";

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

  const { cartInfo } = useSelector((state: RootState) => state.cartReducer);

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
      dispatch(cartActions.remove(Number(productId), option));
    }
  };

  return (
    <div className="CartInfo">
      <section>
        <Table
          attributes={cartAttributes}
          instances={cartInfo}
          onRemoveClick={handleRemoveClick}
        ></Table>
      </section>
      <section>
        <div className="section-wrap__remove-product">
          <span className="remove-product__leftBtn">
            <strong>선택상품을</strong>
            <a href="" className="leftBtn__remove">
              <i className="icon-delete"></i>삭제하기
            </a>
          </span>
          <span className="remove-product__rightBtn">
            <a href="" className="rightBtn__remove">
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
              <td style={totalSalePrice ? undefined : { display: "none" }}>
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
      <section className="section-wrap__btn-wrap">
        <a href="" className="btn-wrap__order-all">
          전체상품주문
        </a>
        <a href="" className="btn-wrap__order-selected">
          선택상품주문
        </a>
        <span>
          <a href="" className="btn-wrap__shop">
            쇼핑계속하기
          </a>
        </span>
      </section>
    </div>
  );
}

export default CartInfo;
