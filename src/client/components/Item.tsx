import * as React from "react";

interface Item {
  name: string;
  category: string;
  price: string;
  salePrice: string | undefined;
  soldOut: boolean;
  width: number;
}

// 상품 이미지 서버에서 가져오는 걸로 수정하기

function Item(props: Item) {
  return (
    <article className="item" style={{ width: `${props.width}%` }}>
      <div className="item__inner">
        <div className="inner__image">
          <a href="">
            <span className="image__sold-out"></span>
            {/* <img
              src={require(`../../public/img/product/${props.name}.jpg`)}
              alt=""
            /> */}
          </a>
        </div>
        <div className="inner_content">
          <a href="" className="content__title"></a>
          <ul className="content__element">
            <li>
              <span>{props.category}</span>
            </li>
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
