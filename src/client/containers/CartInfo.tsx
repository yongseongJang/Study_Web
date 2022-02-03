import * as React from "react";
import { Table } from "../components";

function CartInfo() {
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

  return (
    <div className="CartInfo">
      <section>
        <Table attributes={cartAttributes}></Table>
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
              <th scope="col">
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
                    <span></span>
                  </strong>
                </div>
              </td>
              <td>
                <div>
                  <strong>{`+ `}</strong>
                  <strong>
                    {`KRW `}
                    <span></span>
                  </strong>
                </div>
              </td>
              <td>
                <div>
                  <strong>{`- `}</strong>
                  <strong>
                    {`KRW `}
                    <span></span>
                  </strong>
                </div>
              </td>
              <td>
                <div>
                  <strong>{`= `}</strong>
                  <strong>
                    {`KRW `}
                    <span></span>
                  </strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CartInfo;
