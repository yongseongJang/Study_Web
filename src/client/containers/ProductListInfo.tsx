import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import { Item } from "../components";
import { productActions } from "../actions";

interface ProductListInfoProps {
  category: string;
  itemWidth: number;
}

function ProductListInfo(props: ProductListInfoProps) {
  const dispatch = useDispatch();
  const { productList } = useSelector(
    (state: RootState) => state.productReducer,
  );

  React.useEffect(() => {
    dispatch(productActions.requestProducts(props.category));
  }, []);

  return (
    <div className="productListInfo">
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
  );
}

export default ProductListInfo;
