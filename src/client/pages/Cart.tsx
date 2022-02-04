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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Cart;
