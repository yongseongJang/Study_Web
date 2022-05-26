import * as React from "react";
import { ColumnFilter } from "../components";
import { ProductListInfo } from "../containers";
import { useProductList } from "../hooks";

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
  const { category, page, itemColumnLength, itemWidth, handleClick } =
    useProductList(props.match.params.category, props.location.search);

  return (
    <div className="product-list">
      <div className="product-list__page-outer">
        <div className="page-outer__page-inner">
          <main className="page-inner__contents">
            <div className="contents__section-wrap">
              <section className="section-wrap__title">
                <h4>{category.replace(/_/g, " ")}</h4>
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
                  page={typeof page === "string" ? Number(page) : null}
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
