import * as React from "react";
import { ICartInfo } from "../interfaces";

interface CartItemProps {
  info: ICartInfo;
}

function CartItem(props: CartItemProps) {
  return (
    <div className="cartItem">
      <a href={`/products/${props.info.category}/${props.info.productId}`}>
        <img
          className="cartItem__image"
          src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${props.info.productInfo.image}`}
        ></img>
      </a>
      <p className="cartItem__name">
        <a
          href={`/products/${props.info.category}/${props.info.productId}`}
        >{`${props.info.productInfo.name}`}</a>
      </p>
      <p>{`[옵션: ${props.info.option}]`}</p>
      <ul>
        <li className="cartItem__price">{`KRW ${
          props.info.productInfo.price * props.info.quantity
        }`}</li>
        <li className="cartItem__salePrice">{`-KRW ${
          (props.info.productInfo.price - props.info.productInfo.salePrice) *
          props.info.quantity
        }`}</li>
        <li className="cartItem__quantity">{`수량 : ${props.info.quantity}`}</li>
      </ul>
    </div>
  );
}

export default CartItem;
