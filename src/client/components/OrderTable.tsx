import * as React from "react";

interface OrderTableProps {
  attributes: string[];
}

function OrderTable(props: OrderTableProps) {
  return (
    <div className="orderTable">
      <table>
        <colgroup>
          <col style={{ width: "135px" }} />
          <col style={{ width: "93px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "61px" }} />
          <col style={{ width: "111px" }} />
          <col style={{ width: "111px" }} />
          <col style={{ width: "111px" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              주문일자
              <br />
              [주문번호]
            </th>
            <th scope="col">이미지</th>
            <th scope="col">상품정보</th>
            <th scope="col">수량</th>
            <th scope="col">상품구매금액</th>
            <th scope="col">주문처리상태</th>
            <th scope="col">취소/교환/반품</th>
            {props.attributes &&
              props.attributes.map((attr, index) => {
                return (
                  <th scope="col" key={index}>
                    {attr}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default OrderTable;
