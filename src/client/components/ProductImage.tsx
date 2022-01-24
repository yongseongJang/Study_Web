import * as React from "react";
import { IProductImage } from "../interfaces";

interface productImageProps {
  productImage: IProductImage[];
}

function ProductImage(props: productImageProps) {
  return (
    <div className="productImage">
      {props.productImage.map((image, index) => {
        return (
          <React.Fragment key={index}>
            <div className="productImage__image">
              <img
                src={`${process.env.REACT_APP_S3_URI}/${image.fileName}`}
                alt=""
              />
            </div>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProductImage;
