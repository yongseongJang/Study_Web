import * as React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { OrderTable, Spinner } from "../components";
import { orderActions } from "../actions";
import { orderSelectors } from "../selectors";

function OrderInfo() {
  const dispatch = useDispatch();

  const orderAttributes = [
    "이미지",
    "상품정보",
    "수량",
    "상품구매금액",
    "주문처리상태",
    "취소/교환/반품",
  ];

  const [cookies] = useCookies(["uniformbridge_token"]);
  const token = cookies.uniformbridge_token;
  const isRequesting = useSelector(orderSelectors.selectIsRequesting);
  const orderInfo = useSelector(orderSelectors.selectOrderInfo);

  useEffect(() => {
    if (token) {
      dispatch(orderActions.requestMemberOrderInfo(token));
    }
  }, []);

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
