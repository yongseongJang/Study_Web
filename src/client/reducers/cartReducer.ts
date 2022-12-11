import { List, Record } from "immutable";
import type { RecordOf } from "immutable";
import { ICartInfo } from "../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ cartInfo: ICartInfo[]; token?: string }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    addSuccess: (state, action: PayloadAction<{ cartInfo: ICartInfo[] }>) => {
      const tmp = state.cartInfo.toArray();
      const { cartInfo } = action.payload;

      tmp.forEach((info, index) => {
        for (let i = 0; i < cartInfo.length; i++) {
          if (
            info.productId === cartInfo[i].productId &&
            info.option === cartInfo[i].option
          ) {
            tmp[index].quantity += cartInfo[i].quantity;

            cartInfo.splice(i, 1);
            break;
          }
        }
      });

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () =>
          Array.isArray(cartInfo) && cartInfo.length > 0
            ? List(tmp.concat(cartInfo))
            : List(tmp),
        );
    },
    addFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    remove: (
      state,
      action: PayloadAction<{
        productId: number;
        option: string;
        token: string;
      }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    removeSuccess: (
      state,
      action: PayloadAction<{ productId: number; option: string }>,
    ) => {
      const { productId, option } = action.payload;
      const tmp = state.cartInfo.toArray();

      let removeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (info.productId === productId && info.option === option) {
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
    },
    removeFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    selectRemove: (
      state,
      action: PayloadAction<{
        cartInfo: Pick<ICartInfo, "productId" | "option">[];
        token: string;
      }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    selectRemoveSuccess: (
      state,
      action: PayloadAction<{
        cartInfo: Pick<ICartInfo, "productId" | "option">[];
      }>,
    ) => {
      const { cartInfo } = action.payload;
      const tmp = state.cartInfo.toArray();

      cartInfo.forEach(
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
    },
    selectRemoveFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    removeAll: (state, action: PayloadAction<{ token: string }>) => {
      return state.update("isRequesting", () => true);
    },
    removeAllSuccess: (state) => {
      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List());
    },
    removeAllFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; option: string }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    increaseQuantitySuccess: (
      state,
      action: PayloadAction<{ productId: number; option: string }>,
    ) => {
      const { productId, option } = action.payload;
      const tmp = state.cartInfo.toArray();

      let increaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (info.productId === productId && info.option == option) {
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
    },
    increaseQuantityFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state.update("isRequesting", () => false);
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; option: string }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    decreaseQuantitySuccess: (
      state,
      action: PayloadAction<{ productId: number; option: string }>,
    ) => {
      const { productId, option } = action.payload;
      const tmp = state.cartInfo.toArray();

      let decreaseIndex = -1;
      state.cartInfo.some((info, index) => {
        if (info.productId === productId && info.option == option) {
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
    },
    decreaseQuantityFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state.update("isRequesting", () => false);
    },
    changeQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        option: string;
        quantity: number;
      }>,
    ) => {
      return state.update("isRequesting", () => true);
    },
    changeQuantitySuccess: (
      state,
      action: PayloadAction<{
        productId: number;
        option: string;
        quantity: number;
      }>,
    ) => {
      const { productId, option, quantity } = action.payload;
      const tmp = state.cartInfo.toArray();

      let changeIndex = -1;
      state.cartInfo.some((info, index) => {
        if (info.productId === productId && info.option == option) {
          changeIndex = index;

          return true;
        }

        return false;
      });

      if (changeIndex !== -1) {
        tmp[changeIndex].quantity = quantity;
      }

      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(tmp));
    },
    changeQuantityFailure: (state, action: PayloadAction<{ err: unknown }>) => {
      return state.update("isRequesting", () => false);
    },
    requestCartProduct: (state, action: PayloadAction<{ token: string }>) => {
      return state.update("isRequesting", () => true);
    },
    requestCartProductSuccess: (
      state,
      action: PayloadAction<{ cartInfo: ICartInfo[] }>,
    ) => {
      const { cartInfo } = action.payload;
      return state
        .update("isRequesting", () => false)
        .update("cartInfo", () => List(cartInfo));
    },
    requestCartProductFailure: (
      state,
      action: PayloadAction<{ err: unknown }>,
    ) => {
      return state.update("isRequesting", () => false);
    },
    setCartProduct: (
      state,
      action: PayloadAction<{ cartInfo: ICartInfo[] }>,
    ) => {
      const { cartInfo } = action.payload;
      return state.update("cartInfo", () => List(cartInfo));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
