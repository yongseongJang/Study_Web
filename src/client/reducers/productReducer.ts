import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IPagination,
  IProduct,
  IProductImage,
  IProductDetail,
  IProductCaution,
  IProductSize,
} from "../interfaces";

const makePaginationState: Record.Factory<IPagination> = Record({
  totalPage: 0,
  startPage: 0,
  endPage: 0,
  currentPage: 0,
  startIndex: 0,
  endIndex: 0,
});

type PaginationState = RecordOf<IPagination>;

const initialPaginationState: PaginationState = makePaginationState();

interface ProductDetail {
  _id: number;
  name: string;
  price: number;
  salePrice: number;
  image: string;
  size: string;
  stockCount: number;
  sellCount: number;
  productImage: List<IProductImage>;
  productDetail: List<IProductDetail>;
  productCaution: List<IProductCaution>;
  productSize: List<IProductSize>;
}

const makeProductDetailState: Record.Factory<ProductDetail> = Record({
  _id: 0,
  name: "",
  price: 0,
  salePrice: 0,
  image: "",
  size: "",
  stockCount: 0,
  sellCount: 0,
  productImage: List(),
  productDetail: List(),
  productCaution: List(),
  productSize: List(),
});

type ProductDetailState = RecordOf<ProductDetail>;

const initialProductDetailState: ProductDetailState = makeProductDetailState();
interface State {
  isRequesting: boolean;
  pagination: PaginationState;
  productList: List<{
    product: Omit<
      IProduct,
      "productDetail" | "productImage" | "productCaution" | "productSize"
    >;
  }>;
  productDetail: ProductDetailState;
}

const defaultValues: State = {
  isRequesting: false,
  pagination: initialPaginationState,
  productList: List(),
  productDetail: initialProductDetailState,
};

const makeProductState: Record.Factory<State> = Record(defaultValues);

export type ProductState = RecordOf<State>;

const initialState: ProductState = makeProductState();

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    requestProducts: (
      state,
      action: PayloadAction<{ category: string; page: number }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    requestProductsSuccess: (
      state,
      action: PayloadAction<{
        pagination: IPagination;
        productList: Iterable<{
          product: Omit<
            IProduct,
            "productDetail" | "productImage" | "productCaution" | "productSize"
          >;
        }>;
      }>,
    ) => {
      const { pagination, productList } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("pagination", () => makePaginationState(pagination))
        .update("productList", () => List(productList));
    },
    requestProductsFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state.update("isRequesting", () => false);
    },
    requestProductDetail: (
      state,
      action: PayloadAction<{ category: string; productId: number }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    requestProductDetailSuccess: (
      state,
      action: PayloadAction<{
        product: IProduct;
      }>,
    ) => {
      const { product } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("productDetail", () =>
          makeProductDetailState({
            ...product,
            productImage: List(product.productImage),
            productDetail: List(product.productDetail),
            productCaution: List(product.productCaution),
            productSize: List(product.productSize),
          }),
        );
    },
    requestProductDetailFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state.update("isRequesting", () => false);
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
