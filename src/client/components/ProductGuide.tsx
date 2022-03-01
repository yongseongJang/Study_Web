import * as React from "react";
import { useState } from "react";
import { IProductCaution } from "../interfaces";

interface productGuideProps {
  productCaution: IProductCaution[] | undefined;
  name: string;
  size: string;
}

function ProductGuide(props: productGuideProps) {
  const [isVisibleGuide, setIsVisibleGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleGuideClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsVisibleGuide(!isVisibleGuide);
  };

  const handleTabClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const id = e.currentTarget.id.split("_")[2];

    switch (id) {
      case "1":
        setActiveTab(1);
        break;
      case "2":
        setActiveTab(2);
        break;
    }
  };

  return (
    <div className="productGuide">
      <div
        className="productGuide__size-popup"
        style={isVisibleGuide ? undefined : { display: "none" }}
      >
        <span className="size-popup__closeBtn" onClick={handleGuideClick}>
          <span className="closeBtn__wrap">
            <span className="wrap__line1"></span>
            <span className="wrap__line2"></span>
          </span>
        </span>
        <img src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${props.size}`} />
      </div>
      <span className="productGuide__size">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGuideClick}
        >
          SIZE GUIDE
        </a>
      </span>
      <ul className="productGuide__nav">
        <li>
          <a
            id="productGuide_tab_1"
            className={activeTab == 1 ? "nav__tab-active" : undefined}
            href="#"
            onClick={handleTabClick}
          >
            CAUTION
          </a>
        </li>
        <li>
          <a
            id="productGuide_tab_2"
            className={activeTab == 2 ? "nav__tab-active" : undefined}
            href="#"
            onClick={handleTabClick}
          >
            DELIVERY
          </a>
        </li>
      </ul>
      <div className="productGuide__stage">
        <div
          className="state-1"
          style={activeTab === 1 ? undefined : { display: "none" }}
        >
          <p>
            {props.productCaution &&
              props.productCaution.map((caution, index) => {
                return (
                  <React.Fragment key={index}>
                    {caution.caution}
                    <br />
                    <br />
                  </React.Fragment>
                );
              })}
          </p>
        </div>
        <div
          className="stage-2"
          style={activeTab === 2 ? undefined : { display: "none" }}
        >
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
