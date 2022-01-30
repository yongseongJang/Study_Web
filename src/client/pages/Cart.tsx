import * as React from "react";
import { TopMenu } from "../components";
import { CartInfo } from "../containers";

function Cart() {
  return (
    <div className="cart">
      <div className="cart__page-outer">
        <div className="page-outer__page-inner">
          <TopMenu />
          <main className="page-inner_contents">
            <div className="contents__section-wrap">
              <section>
                <h2 className="section-wrap__title">Cart</h2>
              </section>
              <section>
                <CartInfo></CartInfo>
                <div>
                  <span>
                    <strong>선택상품을</strong>
                    <a href="">
                      <i className="icon-delete"></i>삭제하기
                    </a>
                  </span>
                  <span>
                    <a href="">장바구니비우기</a>
                    <a href="">견적서출력</a>
                  </span>
                </div>
              </section>
              <section className="section-wrap_total-summary">
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
              <section>
                <a href="">전체상품주문</a>
                <a href="">선택상품주문</a>
                <span>
                  <a href="">쇼핑계속하기</a>
                </span>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Cart;
