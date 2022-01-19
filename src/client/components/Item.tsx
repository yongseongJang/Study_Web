import * as React from "react";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice: number;
  soldOut: boolean;
  width: number;
}

// 상품 이미지 서버에서 가져오는 걸로 수정하기

function Item(props: Item) {
  return (
    <article className="item" style={{ width: `${props.width}%` }}>
      <div className="item__inner">
        <div className="inner__image">
          <a href={`/products/${props.category}/${props.id}`}>
            <span className="image__sold-out"></span>
            <img
              src={require(`../../public/img/all_product/${props.name}.jpg`)}
              alt=""
            />
          </a>
        </div>
        <div className="inner_content">
          <a href="" className="content__title">
            {props.name}
          </a>
          <ul className="content__element">
            <li>
              <span>{`KRW ${props.price}`}</span>
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
