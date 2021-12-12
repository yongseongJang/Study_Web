import * as React from "react";
import * as queryString from "query-string";

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
              <section></section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
