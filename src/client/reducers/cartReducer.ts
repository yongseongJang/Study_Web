import { cartConstants } from "../actions";
import { ICartInfo } from "../interfaces";

const initialState: { isRequesting: boolean; cartInfo: ICartInfo[] } = {
  isRequesting: false,
  cartInfo: [],
};

export const cartReducer = (
  state = initialState,
  action: { type: string; [key: string]: any },
) => {
  let tmp: ICartInfo[] = [];

  switch (action.type) {
    case cartConstants.REQUEST_ADD:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_ADD:
      tmp = [...state.cartInfo];

      tmp.forEach((info, index) => {
        for (let i = 0; i < action.cartInfo.length; i++) {
          if (
            info.productId === action.cartInfo[i].productId &&
            info.option === action.cartInfo[i].option
          ) {
            tmp[index].quantity += action.cartInfo[i].quantity;

            action.cartInfo.splice(i, 1);
            break;
          }
        }
      });

      return {
        ...state,
        isRequesting: false,
        cartInfo:
          Array.isArray(action.cartInfo) && action.cartInfo.length > 0
            ? tmp.concat(action.cartInfo)
            : tmp,
      };
    case cartConstants.FAILURE_ADD:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_REMOVE:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_REMOVE:
      tmp = [...state.cartInfo];

      let removeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === action.productId &&
          info.option === action.option
        ) {
          removeIndex = index;

          return true;
        }

        return false;
      });

      if (removeIndex !== -1) {
        tmp.splice(removeIndex, 1);
      }
      return { ...state, isRequesting: false, cartInfo: tmp };
    case cartConstants.FAILURE_REMOVE:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_SELECT_REMOVE:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_SELECT_REMOVE:
      tmp = [...state.cartInfo];

      action.selectInfo.forEach(
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

      return { ...state, isRequesting: false, cartInfo: tmp };
    case cartConstants.FAILURE_SELECT_REMOVE:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_REMOVE_ALL:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_REMOVE_ALL:
      return { ...state, isRequesting: false, cartInfo: [] };
    case cartConstants.FAILURE_REMOVE_ALL:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_INCREASE_QUANTITY:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_INCREASE_QUANTITY:
      tmp = [...state.cartInfo];

      let increaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === action.productId &&
          info.option == action.option
        ) {
          increaseIndex = index;

          return true;
        }

        return false;
      });

      if (increaseIndex !== -1) {
        tmp[increaseIndex].quantity++;
      }
      return { ...state, isRequesting: false, cartInfo: tmp };
    case cartConstants.FAILURE_INCREASE_QUANTITY:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_DECREASE_QUANTITY:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_DECREASE_QUANTITY:
      tmp = [...state.cartInfo];

      let decreaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === action.productId &&
          info.option == action.option
        ) {
          decreaseIndex = index;

          return true;
        }

        return false;
      });

      if (decreaseIndex !== -1) {
        tmp[decreaseIndex].quantity--;
      }
      return { ...state, isRequesting: false, cartInfo: tmp };
    case cartConstants.FAILURE_DECREASE_QUANTITY:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_CHANGE_QUANTITY:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_CHANGE_QUANTITY:
      tmp = [...state.cartInfo];

      let changeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (
          info.productId === action.productId &&
          info.option == action.option
        ) {
          changeIndex = index;

          return true;
        }

        return false;
      });

      if (changeIndex !== -1) {
        tmp[changeIndex].quantity = action.quantity;
      }
      return { ...state, isRequesting: false, cartInfo: tmp };
    case cartConstants.FAILURE_CHANGE_QUANTITY:
      return { ...state, isRequesting: false };
    case cartConstants.REQUEST_CART_PRODUCT:
      return { ...state, isRequesting: true };
    case cartConstants.REQUEST_CART_PRODUCT_SUCCESS:
      return { ...state, isRequesting: false, cartInfo: action.cartInfo };
    case cartConstants.REQUEST_CART_PRODUCT_FAILURE:
      return { ...state, isRequesting: false };
    default:
      return state;
  }
};
