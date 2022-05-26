import * as React from "react";
import { Item, Pagination, Spinner } from "../components";
import { useProductListInfo } from "../hooks";

interface ProductListInfoProps {
  category: string;
  page: number | null;
  itemWidth: number;
}

function ProductListInfo(props: ProductListInfoProps) {
  const { isRequesting, pagination, productList } = useProductListInfo(
    props.page,
    props.category,
  );

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
