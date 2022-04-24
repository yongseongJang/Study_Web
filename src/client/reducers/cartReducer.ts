import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { cartConstants } from "../actions";
import { ICartInfo } from "../interfaces";

interface State {
  isRequesting: boolean;
  cartInfo: List<ICartInfo>;
}

const defaultValues: State = {
  isRequesting: false,
  cartInfo: List(),
};

const makeCartState: Record.Factory<State> = Record(defaultValues);

export type CartState = RecordOf<State>;

const initialState: CartState = makeCartState();

export const cartReducer = (
  state = initialState,
  action: { type: string; payload: { [key: string]: any } },
) => {
  let tmp: ICartInfo[] = [];
  const payload = action.payload;

  switch (action.type) {
    case cartConstants.REQUEST_ADD:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_ADD:
      tmp = [...state.cartInfo];

      tmp.forEach((info, index) => {
        for (let i = 0; i < payload.cartInfo.length; i++) {
          if (
            info.productId === payload.cartInfo[i].productId &&
            info.option === payload.cartInfo[i].option
          ) {
            tmp[index].quantity += payload.cartInfo[i].quantity;

            payload.cartInfo.splice(i, 1);
            break;
          }
        }
      });

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () =>
          Array.isArray(payload.cartInfo) && payload.cartInfo.length > 0
            ? List(tmp.concat(payload.cartInfo))
            : List(tmp),
        );
    case cartConstants.FAILURE_ADD:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_REMOVE:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_REMOVE:
      tmp = [...state.cartInfo];

      let removeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === payload.productId &&
          info.option === payload.option
        ) {
          removeIndex = index;

          return true;
        }

        return false;
      });

      if (removeIndex !== -1) {
        tmp.splice(removeIndex, 1);
      }

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    case cartConstants.FAILURE_REMOVE:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_SELECT_REMOVE:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_SELECT_REMOVE:
      tmp = [...state.cartInfo];

      payload.cartInfo.forEach(
        (selectProduct: { productId: number; option: string }) => {
          let removeIndex = -1;

          tmp.some((info, index) => {
            if (
              info.productId === selectProduct.productId &&
              info.option === selectProduct.option
            ) {
              removeIndex = index;

              return true;
            }

            return false;
          });

          if (removeIndex !== -1) {
            tmp.splice(removeIndex, 1);
          }
        },
      );

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    case cartConstants.FAILURE_SELECT_REMOVE:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_REMOVE_ALL:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_REMOVE_ALL:
      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List());
    case cartConstants.FAILURE_REMOVE_ALL:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_INCREASE_QUANTITY:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_INCREASE_QUANTITY:
      tmp = [...state.cartInfo];

      let increaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === payload.productId &&
          info.option == payload.option
        ) {
          increaseIndex = index;

          return true;
        }

        return false;
      });

      if (increaseIndex !== -1) {
        tmp[increaseIndex].quantity++;
      }

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    case cartConstants.FAILURE_INCREASE_QUANTITY:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_DECREASE_QUANTITY:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_DECREASE_QUANTITY:
      tmp = [...state.cartInfo];

      let decreaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === payload.productId &&
          info.option == payload.option
        ) {
          decreaseIndex = index;

          return true;
        }

        return false;
      });

      if (decreaseIndex !== -1) {
        tmp[decreaseIndex].quantity--;
      }

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    case cartConstants.FAILURE_DECREASE_QUANTITY:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_CHANGE_QUANTITY:
      return state.update("isRequesting", () => true);
    case cartConstants.SUCCESS_CHANGE_QUANTITY:
      tmp = [...state.cartInfo];

      let changeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === payload.productId &&
          info.option == payload.option
        ) {
          changeIndex = index;

          return true;
        }

        return false;
      });

      if (changeIndex !== -1) {
        tmp[changeIndex].quantity = payload.quantity;
      }

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    case cartConstants.FAILURE_CHANGE_QUANTITY:
      return state.update("isRequesting", () => false);
    case cartConstants.REQUEST_CART_PRODUCT:
      return state.update("isRequesting", () => true);
    case cartConstants.REQUEST_CART_PRODUCT_SUCCESS:
      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(payload.cartInfo));
    case cartConstants.REQUEST_CART_PRODUCT_FAILURE:
      return state.update("isRequesting", () => false);
    default:
      return state;
  }
};
