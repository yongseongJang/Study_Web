import * as React from "react";
import { useState } from "react";
import { render, fireEvent, waitFor } from "./test-utils";
import { ProductInfo } from "../../client/containers";
import { IOption } from "../../client/interfaces";

jest.mock("../../client/hooks", () => ({
  useProductInfo: () => {
    const [option, setOption] = useState<IOption>({});

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
      option,
      isVisibleCart: false,
      setOption,
      handleLeftBtnClick: () => {},
      handleRightBtnClick: () => {},
    };
  },
}));

function renderProductInfo() {
  const result = render(
    <ProductInfo category={"all_product"} productId={43} />,
  );

  const sizeBtn = () => result.container.querySelector("[data-size='S']");

  const quantityIncreaseBtn = () =>
    result.container.getElementsByClassName("quantity__increase");

  const quantityDecreaseBtn = () =>
    result.container.getElementsByClassName("quantity__decrease");

  const deleteOptionBtn = () =>
    result.container.getElementsByClassName("wrap__delete-img");

  const sizeGuideMenu = () => result.getByText("SIZE GUIDE");

  const sizePopup = () =>
    result.container.getElementsByClassName("productGuide__size-popup");

  const clickSizeBtn = () => {
    const sizeBtnElement = sizeBtn();

    if (sizeBtnElement) {
      fireEvent.click(sizeBtnElement);
    }
  };

  const clickDeleteOptionBtn = () => {
    const deleteOptionBtnElement = deleteOptionBtn();

    if (deleteOptionBtnElement.length) {
      fireEvent.click(deleteOptionBtnElement[0]);
    }
  };

  const clickSizeGuide = () => {
    const sizeGuideMenuElement = sizeGuideMenu();

    fireEvent.click(sizeGuideMenuElement);
  };

  return {
    result,
    sizeBtn,
    quantityIncreaseBtn,
    quantityDecreaseBtn,
    deleteOptionBtn,
    sizePopup,
    clickSizeBtn,
    clickDeleteOptionBtn,
    clickSizeGuide,
  };
}

describe("<ProductInfo />", () => {
  it("render component correctly", () => {
    const { sizeBtn } = renderProductInfo();

    const btn = sizeBtn();

    if (btn) {
      expect(btn.textContent).toBe("S");
    }
  });

  it("if size button click, selected option be created", () => {
    const {
      clickSizeBtn,
      quantityIncreaseBtn,
      quantityDecreaseBtn,
      deleteOptionBtn,
    } = renderProductInfo();

    clickSizeBtn();

    expect(quantityIncreaseBtn()).toHaveLength(1);
    expect(quantityDecreaseBtn()).toHaveLength(1);
    expect(deleteOptionBtn()).toHaveLength(1);
  });

  it("if delete option btn click, selected option be removed", () => {
    const {
      clickSizeBtn,
      clickDeleteOptionBtn,
      quantityIncreaseBtn,
      quantityDecreaseBtn,
      deleteOptionBtn,
    } = renderProductInfo();

    clickSizeBtn();

    clickDeleteOptionBtn();

    expect(quantityIncreaseBtn()).toHaveLength(0);
    expect(quantityDecreaseBtn()).toHaveLength(0);
    expect(deleteOptionBtn()).toHaveLength(0);
  });

  it("if size guide menu click, size guide modal is displayed", () => {
    const { sizePopup, clickSizeGuide } = renderProductInfo();

    clickSizeGuide();

    expect(sizePopup()).toHaveLength(1);
  });
});
