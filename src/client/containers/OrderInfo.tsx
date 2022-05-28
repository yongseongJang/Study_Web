import * as React from "react";
import { OrderTable, Spinner } from "../components";
import { useOrderInfo } from "../hooks";

function OrderInfo() {
  const { orderAttributes, isRequesting, orderInfo } = useOrderInfo();
  return (
    <div className="OrderInfo">
      {isRequesting ? (
        <div className="OrderInfo__Spinner">
          <Spinner></Spinner>
        </div>
      ) : (
        <section>
          <OrderTable
            attributes={orderAttributes}
            instances={orderInfo}
          ></OrderTable>
        </section>
      )}
    </div>
  );
}

export default OrderInfo;
