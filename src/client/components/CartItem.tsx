import * as React from "react";
import { IProduct, IOption } from "../interfaces";

interface CartItemProps {
  product: Pick<IProduct, "_id" | "name" | "price" | "salePrice" | "image">;
  size: string;
  quantity: number;
}

function CartItem(props: CartItemProps) {
  return (
    <div className="cartItem">
      <a href={`/products/${props.product._id}`}>
        <img
          className="cartItem__image"
          src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${props.product.image}`}
        ></img>
      </a>
      <p className="cartItem__name">
        <a href={`/products/${props.product._id}`}>{`${props.product.name}`}</a>
      </p>
      <p>{`[옵션: ${props.size}]`}</p>
      <ul>
        <li className="cartItem__price">{`KRW ${props.product.price}`}</li>
        <li className="cartItem__salePrice">{`KRW ${props.product.salePrice}`}</li>
        <li className="cartItem__quantity">{`수량 : ${props.quantity}`}</li>
      </ul>
    </div>
  );
}

export default CartItem;
