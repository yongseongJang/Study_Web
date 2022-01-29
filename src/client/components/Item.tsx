import * as React from "react";
interface Item {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  salePrice: number;
  soldOut: boolean;
  width: number;
}

function Item(props: Item) {
  return (
    <article className="item" style={{ width: `${props.width}%` }}>
      <div className="item__inner">
        <div className="inner__image">
          <a href={`/products/${props.category}/${props.id}`}>
            <span className="image__sold-out"></span>
            <img
              src={`${process.env.REACT_APP_S3_URI}/${props.image}`}
              alt=""
            />
          </a>
        </div>
        <div className="inner_content">
          <a
            href={`/products/${props.category}/${props.id}`}
            className="content__title"
          >
            {props.name}
          </a>
          <ul className="content__element">
            <li>
              <span
                className={props.salePrice ? "invalid-price" : undefined}
              >{`KRW ${props.price}`}</span>
            </li>
            {props.salePrice ? (
              <li>
                <span>{`KRW ${props.salePrice}`}</span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default Item;
