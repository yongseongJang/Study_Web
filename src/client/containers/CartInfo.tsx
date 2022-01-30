import * as React from "react";
import { Table } from "../components";

function CartInfo() {
  const cartAttributes = [
    "이미지",
    "상품정보",
    "수량",
    "상품구매금액",
    "할인금액",
    "적립금",
    "배송구분",
    "배송비",
    "선택",
  ];

  return (
    <div className="CartInfo">
      <Table attributes={cartAttributes}></Table>
    </div>
  );
}

export default CartInfo;
