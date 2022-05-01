import * as React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { TopMenu } from "../components";
import { OrderInfo } from "../containers";
import { RootState } from "../reducers/types";
import { history } from "../utils/history";

function OrderList() {
  const [cookies] = useCookies(["uniformbridge_token"]);
  const token = cookies.uniformbridge_token;
  const nonMemberLogin = useSelector(
    (state: RootState) => state.orderReducer.nonMemberLogin,
  );

  useEffect(() => {
    if (!token && !nonMemberLogin) {
      history.replace("/order/login/");
    }
  }, [token, nonMemberLogin]);

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
