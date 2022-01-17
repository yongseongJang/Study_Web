import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import * as queryString from "query-string";
import { Item, ColumnFilter } from "../components";
import { productActions } from "../actions";
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

  const dispatch = useDispatch();
  const { pagination, products } = useSelector(
    (state: RootState) => state.productReducer,
  );

  useEffect(() => {
    dispatch(productActions.requestProducts(category));
  }, []);

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
                  {products.map((product, index) => {
                    return (
                      <Item
                        key={index}
                        name={product.name}
                        price={product.price}
                        salePrice={product.salePrice}
                        soldOut={product.stockCount > 0 ? true : false}
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
