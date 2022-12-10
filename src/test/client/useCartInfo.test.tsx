import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCartInfo } from "../../client/hooks";

jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../../client/selectors", () => ({
  cartSelectors: {
    selectIsRequesting: jest.fn().mockReturnValue(false),
    selectCartInfo: jest.fn().mockReturnValue([
      {
        category: "all_product",
        option: "M",
        productId: 34,
        productInfo: {
          name: "collar button knit beige",
          price: 129000,
          salePrice: 90300,
        },
        quantity: 1,
      },
    ]),
  },
}));

function setupRenderCustomHook() {
  return renderHook(() => useCartInfo());
}

describe("useCartInfo", () => {
  it("test custom hook", async () => {
    const { result } = setupRenderCustomHook();

    expect(result.current.isRequesting).toEqual(false);
    expect(result.current.cartInfo.length).toEqual(1);
  });
});
