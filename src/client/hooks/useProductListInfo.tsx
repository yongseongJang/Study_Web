import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../reducers/productReducer";
import { productSelectors } from "../selectors";

const useProductListInfo = (page: number | null, category: string) => {
  const dispatch = useDispatch();

  const isRequesting = useSelector(productSelectors.selectIsRequesting);
  const pagination = useSelector(productSelectors.selectPagination);
  const productList = useSelector(productSelectors.selectProductList);

  useEffect(() => {
    dispatch(productActions.requestProducts({ category, page: page || 1 }));
  }, []);

  return {
    isRequesting,
    pagination,
    productList,
  };
};

export default useProductListInfo;
