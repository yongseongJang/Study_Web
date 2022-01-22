import * as React from "react";
import { IProductCaution } from "../interfaces";

interface productGuideProps {
  productCaution: IProductCaution[] | undefined;
}

function ProductGuide(props: productGuideProps) {
  return (
    <div className="productGuide">
      <span className="productGuide__size">
        <a href="#">SIZE GUIDE</a>
      </span>
      <ul className="productGuide__nav">
        <li className="nav__tab-active">
          <a href="#">CAUTION</a>
        </li>
        <li>
          <a href="#">DELIVERY</a>
        </li>
      </ul>
      <div className="productGuide__stage">
        <div className="state-1">
          <p>
            {props.productCaution
              ? props.productCaution.map((caution, index) => {
                  return (
                    <React.Fragment key={index}>
                      {caution.caution}
                      <br />
                    </React.Fragment>
                  );
                })
              : null}
          </p>
        </div>
        <div className="stage-2">
          <p>
            <strong>배송 안내</strong>
            <br />
            고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만,
            상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
            <br />
            배송일은 약 2~4일 소요되며, 예약 배송 상품의 경우 지정된 일정에 따라
            배송됩니다.
            <br />
            <br />
            <strong>반품 및 교환</strong>
            <br />- 환불 및 교환은 에딧에디션 고객센터 또는 문의 게시판을 통해
            신청하신 후 안내에 따라 진행해 주시기 바랍니다.
            <br />- 환불 및 교환 신청은 상품을 받으신 날로 부터 7일 이내
            신청하시고, 14일 이내에 본사로 상품이 도착하여야 가능합니다.
            <br />- 고객센터 : 02-0000-0000
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductGuide;
