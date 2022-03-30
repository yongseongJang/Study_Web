import * as React from "react";
import { OrderTable } from "../components";

function OrderInfo() {
  return (
    <div className="OrderInfo">
      <section>
        <OrderTable></OrderTable>
      </section>
    </div>
  );
}

export default OrderInfo;
