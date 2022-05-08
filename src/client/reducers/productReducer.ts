import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { productConstants } from "../actions";
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

export const productReducer = (
  state = initialState,
  action: { type: string; payload: { [key: string]: any } },
) => {
  switch (action.type) {
    case productConstants.REQUEST_PRODUCTS:
      return state.update("isRequesting", () => true);
    case productConstants.REQUEST_PRODUCTS_SUCCESS:
      const { pagination, productList } = action.payload;

      return state
        .update("isRequesting", () => false)
        .update("pagination", () => makePaginationState(pagination))
        .update("productList", () => List(productList));
    case productConstants.REQUEST_PRODUCTS_FAILURE:
      return state.update("isRequesting", () => false);
    case productConstants.REQUEST_PRODUCT_DETAIL:
      return state.update("isRequesting", () => true);
    case productConstants.REQUEST_PRODUCT_DETAIL_SUCCESS:
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
    case productConstants.REQUEST_PRODUCT_DETAIL_FAILURE:
      return state.update("isRequesting", () => false);
    default:
      return state;
  }
};
