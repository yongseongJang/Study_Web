import { take, call, put, fork } from "redux-saga/effects";
import { productServices } from "../services";
import { productConstants, productActions } from "../actions";

export function* requestProduct(payload: { category: string; page: number }) {
  try {
    const { category, page } = payload;

    let _pagination, _productList;

    if (category === "all_product") {
      const { pagination, productList } = yield call(
        productServices.getAllProducts,
        page,
      );

      _pagination = pagination;
      _productList = productList;
    } else {
      const { pagination, productList } = yield call(
        productServices.getProductsByCategory,
        category,
        page,
      );

      _pagination = pagination;
      _productList = productList;
    }

    yield put(productActions.requestProductsSuccess(_pagination, _productList));
  } catch (err) {
    yield put(productActions.requestProductsFailure(err));
  }
}

export function* requestProductDetail(payload: {
  category: string;
  productId: number;
}) {
  try {
    const { category, productId } = payload;

    const { product } = yield call(
      productServices.getProductDetail,
      category,
      productId,
    );

    yield put(productActions.requestProductDetailSuccess(product));
  } catch (err) {
    yield put(productActions.requestProductDetailFailure(err));
  }
}

export function* watchRequestProduct() {
  while (true) {
    const { payload } = yield take(productConstants.REQUEST_PRODUCTS);
    yield call(requestProduct, payload);
  }
}

export function* watchRequestProductDetail() {
  while (true) {
    const { payload } = yield take(productConstants.REQUEST_PRODUCT_DETAIL);
    yield call(requestProductDetail, payload);
  }
}

export const productSaga = [
  fork(watchRequestProduct),
  fork(watchRequestProductDetail),
];
