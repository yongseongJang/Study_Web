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
              <CartInfo></CartInfo>
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default Cart;
