import * as React from "react";
import { IProductDetail } from "../interfaces";

interface productDetailProps {
  brandName: string;
  productName: string;
  productDetail: IProductDetail[];
}

function ProductDetail(props: productDetailProps) {
  return (
    <div className="productDetail">
      <div className="productDetail__contents">
        <div className="contents__box">
          <div className="box__name">
            <a
              href={`/products/${props.brandName.replace(/ /g, "_")}`}
              className="name__brandName"
            >
              {props.brandName.toUpperCase()}
            </a>
            <h5 className="name__productName">{props.productName}</h5>
          </div>
          <div className="box__detail">
            <br />
            {props.productName}
            <br />
            <br />
            Detail
            {props.productDetail
              ? props.productDetail.map((detail, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      {`■ ${detail.detail}`}
                    </React.Fragment>
                  );
                })
              : null}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
