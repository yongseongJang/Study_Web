import { take, call, put, fork } from "redux-saga/effects";
import { productServices } from "../services";
import { productConstants, productActions } from "../actions";

export function* requestProduct(category: string, page: number) {
  try {
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

export function* requestProductDetail(category: string, productId: number) {
  try {
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
    const { category, page } = yield take(productConstants.REQUEST_PRODUCTS);
    yield call(requestProduct, category, page);
  }
}

export function* watchRequestProductDetail() {
  while (true) {
    const { category, productId } = yield take(
      productConstants.REQUEST_PRODUCT_DETAIL,
    );
    yield call(requestProductDetail, category, productId);
  }
}

export const productSaga = [
  fork(watchRequestProduct),
  fork(watchRequestProductDetail),
];
