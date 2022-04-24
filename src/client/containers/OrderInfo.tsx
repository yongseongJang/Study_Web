import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderTable, Spinner } from "../components";
import { RootState } from "../reducers/types";
import { loginSelectors } from "../selectors";
import { orderActions } from "../actions";

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

  const token = useSelector(loginSelectors.selectToken);
  const isRequesting = useSelector(
    (state: RootState) => state.orderReducer.isRequesting,
  );
  const orderInfo = useSelector(
    (state: RootState) => state.orderReducer.orderInfo,
  );

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
