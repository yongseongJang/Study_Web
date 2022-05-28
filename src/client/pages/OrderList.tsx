import * as React from "react";
import { TopMenu } from "../components";
import { OrderInfo } from "../containers";
import { useOrderList } from "../hooks";

function OrderList() {
  useOrderList();

  return (
    <div className="orderList">
      <div className="orderList__page-outer">
        <div className="page-outer__page-inner">
          <TopMenu />
          <main className="page-inner__contents">
            <div className="contents__section-wrap">
              <section>
                <h2 className="section-wrap__title">주문 조회</h2>
              </section>
              <OrderInfo></OrderInfo>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
