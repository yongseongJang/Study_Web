import { take, call, put, fork } from "redux-saga/effects";
import { productServices } from "../services";
import { productActions } from "../reducers/productReducer";

export function* requestProduct(payload: { category: string; page: number }) {
  try {
    const { category, page } = payload;

    if (category === "all_product") {
      const { pagination, productList } = yield call(
        productServices.getAllProducts,
        page,
      );

      yield put(
        productActions.requestProductsSuccess({ pagination, productList }),
      );
    } else {
      const { pagination, productList } = yield call(
        productServices.getProductsByCategory,
        category,
        page,
      );

      yield put(
        productActions.requestProductsSuccess({ pagination, productList }),
      );
    }
  } catch (err) {
    yield put(productActions.requestProductsFailure({ err }));
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

    yield put(productActions.requestProductDetailSuccess({ product }));
  } catch (err) {
    yield put(productActions.requestProductDetailFailure({ err }));
  }
}

export function* watchRequestProduct() {
  while (true) {
    const { payload } = yield take(productActions.requestProducts);
    yield call(requestProduct, payload);
  }
}

export function* watchRequestProductDetail() {
  while (true) {
    const { payload } = yield take(productActions.requestProductDetail);
    yield call(requestProductDetail, payload);
  }
}

export const productSaga = [
  fork(watchRequestProduct),
  fork(watchRequestProductDetail),
];
