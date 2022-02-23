import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { Item, Pagination, Spinner } from "../components";
import { productActions } from "../actions";

interface ProductListInfoProps {
  category: string;
  page: number | null;
  itemWidth: number;
}

function ProductListInfo(props: ProductListInfoProps) {
  const dispatch = useDispatch();

  const isRequesting = useSelector(
    (state: RootState) => state.productReducer.isRequesting,
  );
  const pagination = useSelector(
    (state: RootState) => state.productReducer.pagination,
  );
  const productList = useSelector(
    (state: RootState) => state.productReducer.productList,
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
      {isRequesting ? (
        <div className="productListInfo__spinner">
          <Spinner></Spinner>
        </div>
      ) : (
        <>
          <div className="productListInfo__item-wrap">
            {productList.map((item) => {
              const product = item.product;
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
            page="products"
          ></Pagination>
        </>
      )}
    </div>
  );
}

export default ProductListInfo;
