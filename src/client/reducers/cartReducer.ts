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
  switch (action.type) {
    case cartConstants.REQUEST_ADD:
      return { ...state, isRequesting: true };
    case cartConstants.SUCCESS_ADD:
      const tmp = [...state.cartInfo];

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
    default:
      return state;
  }
};
