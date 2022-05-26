import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../actions";
import { productSelectors } from "../selectors";

const useProductListInfo = (page: number | null, category: string) => {
  const dispatch = useDispatch();

  const isRequesting = useSelector(productSelectors.selectIsRequesting);
  const pagination = useSelector(productSelectors.selectPagination);
  const productList = useSelector(productSelectors.selectProductList);

  useEffect(() => {
    if (page) {
      dispatch(productActions.requestProducts(category, page));
    } else {
      dispatch(productActions.requestProducts(category));
    }
  }, []);

  return {
    isRequesting,
    pagination,
    productList,
  };
};

export default useProductListInfo;
