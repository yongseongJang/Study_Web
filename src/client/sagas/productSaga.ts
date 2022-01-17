import { take, call, put, fork } from "redux-saga/effects";
import { productServices } from "../services";
import { productConstants, productActions } from "../actions";

export function* requestProduct(category: string) {
  try {
    let _pagination, _products;
    if (category === "all_product") {
      const { pagination, products } = yield call(
        productServices.getAllProducts,
      );

      _pagination = pagination;
      _products = products;
    } else {
      const { pagination, products } = yield call(
        productServices.getProductsByCategory,
        category,
      );

      _pagination = pagination;
      _products = products;
    }

    yield put(productActions.requestProductsSuccess(_pagination, _products));
  } catch (err) {
    yield put(productActions.requestProductsFailure(err));
  }
}

export function* watchRequestProduct() {
  while (true) {
    const { category } = yield take(productConstants.REQUEST_PRODUCTS);
    yield call(requestProduct, category);
  }
}

export const productSaga = [fork(watchRequestProduct)];
