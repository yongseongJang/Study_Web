import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { Item, Pagination } from "../components";
import { productActions } from "../actions";

interface ProductListInfoProps {
  category: string;
  page: number | null;
  itemWidth: number;
}

function ProductListInfo(props: ProductListInfoProps) {
  const dispatch = useDispatch();
  const { pagination, productList } = useSelector(
    (state: RootState) => state.productReducer,
  );

  React.useEffect(() => {
    if (props.page) {
      dispatch(productActions.requestProducts(props.category, props.page));
    } else {
      dispatch(productActions.requestProducts(props.category));
    }
  }, []);

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
        category={props.category}
      ></Pagination>
    </div>
  );
}

export default ProductListInfo;
