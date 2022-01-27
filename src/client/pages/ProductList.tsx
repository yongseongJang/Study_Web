import * as React from "react";
import { useState } from "react";
import * as queryString from "query-string";
import { ColumnFilter } from "../components";
import { ProductListInfo } from "../containers";

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
  const category = props.match.params.category.replace(/_/g, " ");
  const search = queryString.parse(props.location.search);

  const [itemColumnLength, setItemColumnLength] = useState<number>(4);

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
                <ProductListInfo
                  category={category}
                  itemWidth={itemWidth}
                ></ProductListInfo>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
