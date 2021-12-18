import * as React from "react";
import { useState } from "react";
import * as queryString from "query-string";
import { Item, ColumnFilter } from "../components";
interface ProductListProps {
  match: {
    params: {
      category: string;
    };
    path: string;
    url: string;
    isExact: boolean;
  };
  location: {
    hash: string;
    pathname: string;
    search: string;
  };
}

function ProductList(props: ProductListProps) {
  const category = props.match.params.category.replace(/-/g, " ");
  const search = queryString.parse(props.location.search);

  const [itemColumnLength, setItemColumnLength] = useState<number>(4);

  // 상품 정보 서버에서 가져오는 걸로 수정하기
  const productList = [
    {
      name: "wool balmacaan coat navy",
      category: "UNIFORM BRIDGE",
      price: "315,000",
      salePrice: "252,000",
      soldOut: false,
    },
    {
      name: "wool balmacaan coat black",
      category: "UNIFORM BRIDGE",
      price: "315,000",
      salePrice: "252,000",
      soldOut: false,
    },
    {
      name: "wool balmacaan coat khaki beige",
      category: "UNIFORM BRIDGE",
      price: "315,000",
      salePrice: "252,000",
      soldOut: false,
    },
    {
      name: "utility mountain down parka navy",
      category: "UNIFORM BRIDGE",
      price: "299,000",
      salePrice: "239,200",
      soldOut: false,
    },
    {
      name: "utility mountain down parka grey",
      category: "UNIFORM BRIDGE",
      price: "299,000",
      salePrice: "239,200",
      soldOut: false,
    },
    {
      name: "utility mountain down parka khaki",
      category: "UNIFORM BRIDGE",
      price: "299,000",
      salePrice: "239,200",
      soldOut: false,
    },
  ];

  const itemWidth = 80 / itemColumnLength;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const column = Number(e.currentTarget.dataset.column);

    setItemColumnLength(column);
  };

  return (
    <div className="product-list">
      <div className="product-list__page-outer">
        <div className="page-outer__page-inner">
          <main className="page-inner__contents">
            <div className="contents__section-wrap">
              <section className="section-wrap__title">
                <h4>{category}</h4>
                <div className="title__page">
                  <ul>
                    <li>
                      <a href=""></a>
                    </li>
                  </ul>
                </div>
              </section>
              <section className="section-wrap__products">
                <div className="products__filter">
                  <div className="filter__category"></div>
                  <ColumnFilter
                    column={itemColumnLength}
                    onClick={handleClick}
                  />
                </div>
                <div className="products__item-wrap">
                  {productList.map((product, index) => {
                    return (
                      <Item
                        key={index}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        salePrice={product.salePrice}
                        soldOut={product.soldOut}
                        width={itemWidth}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
