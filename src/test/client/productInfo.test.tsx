import * as React from "react";
import { render, fireEvent, waitFor } from "./test-utils";
import { ProductInfo } from "../../client/containers";

jest.mock("../../client/hooks", () => ({
  useProductInfo: () => {
    return {
      product: {
        _id: 43,
        name: "selvedge denim pants indigo",
        price: 89000,
        image: "all_product/selvedge_denim_pants_indigo.jpg",
      },
      productDetail: [{ detailOrder: 1, detail: "made in korea" }],
      productSize: [{ sizeOrder: 1, size: "S" }],
      productImage: [
        {
          imageOrder: 1,
          fileName:
            "selvedge_denim_pants_indigo/selvedge_denim_pants_indigo_1.jpg",
        },
      ],
      productCaution: [
        {
          cautionOrder: 1,
          caution:
            "소재 특성상 땀, 수분, 마찰에 의해 이염 현상이 발생할 수 있으니 주의 부탁드리며, 밝은 색계열 옷,가방,악세사리 등 과 함께 착용을 자제해주시기 바랍니다.",
        },
      ],
      browserWidth: 1076,
      option: {},
      isVisibleCart: false,
      setOption: () => {},
      handleLeftBtnClick: () => {},
      handleRightBtnClick: () => {},
    };
  },
}));

function renderProductInfo() {
  const result = render(
    <ProductInfo category={"all_product"} productId={43} />,
  );

  return {
    result,
  };
}

describe("<ProductInfo />", () => {
  it("render component correctly", async () => {
    const { result } = renderProductInfo();

    const sizeBtn = result.container.querySelector("[data-size='S']");

    if (sizeBtn) {
      expect(sizeBtn.textContent).toBe("S");
    }
  });

  it("if size button click, selected option be created", async () => {
    const { result } = renderProductInfo();

    const sizeBtn = result.container.querySelector("[data-size='S']");

    if (sizeBtn) {
      fireEvent.click(sizeBtn);

      await waitFor(() =>
        expect(
          result.container.getElementsByClassName("quantity__increase"),
        ).toHaveLength(1),
      );
    }
  });
});
