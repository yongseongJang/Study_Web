import * as React from "react";
import { useSelector } from "react-redux";
import { loginSelectors } from "../selectors";
import { OrderForm } from "../containers";

function Order() {
  const token = useSelector(loginSelectors.selectToken);

  return (
    <div className="order">
      <div className="order__header">
        <div className="header__wrap">
          <h1>
            <a href="/">EDITEDITION</a>
          </h1>
          <div className="wrap__menu left">
            <a href=""></a>
          </div>
          <div className="wrap__menu right">
            <div className="material-icons">
              <a href="/order/cart">
                <span className="material-icons-outlined">shopping_bag</span>
              </a>
            </div>
            <div className="material-icons">
              <a href={token ? "javascript:;" : "/member/login"}>
                <span className="material-icons-outlined">person</span>
              </a>
            </div>
          </div>
        </div>
        <div className="header__titleArea">
          <h1>주문/결제</h1>
        </div>
      </div>
      <OrderForm></OrderForm>
    </div>
  );
}

export default Order;
