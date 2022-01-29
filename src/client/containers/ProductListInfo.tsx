import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { Item, Pagination } from "../components";
import { productActions } from "../actions";

interface ProductListInfoProps {
  category: string;
  itemWidth: number;
}

function ProductListInfo(props: ProductListInfoProps) {
  const dispatch = useDispatch();
  const { pagination, productList } = useSelector(
    (state: RootState) => state.productReducer,
  );

  React.useEffect(() => {
    dispatch(productActions.requestProducts(props.category));
  }, []);

  const requestPage = (page: number) => {
    dispatch(productActions.requestProducts(props.category, page));
  };

  return (
    <div className="productListInfo">
      <div className="productListInfo__item-wrap">
        {productList.map((product) => {
          return (
            <Item
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              category={props.category}
              price={product.price}
              salePrice={product.salePrice}
              soldOut={product.stockCount > 0 ? true : false}
              width={props.itemWidth}
            />
          );
        })}
      </div>

      <Pagination
        pagination={pagination}
        requestPage={requestPage}
      ></Pagination>
    </div>
  );
}

export default ProductListInfo;