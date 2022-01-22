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
              <img src="" alt="" />
            </div>
            <p>
              <p>
                <br />
              </p>
              <br />
            </p>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProductImage;
