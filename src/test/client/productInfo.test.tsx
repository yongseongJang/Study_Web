import * as React from "react";
import { render, fireEvent, waitFor } from "./test-utils";
import { ProductInfo } from "../../client/containers";

function renderProductInfo() {
  const result = render(
    <ProductInfo category={"all_product"} productId={43} />,
  );

  return {
    result,
  };
}

describe("<ProductInfo />", () => {
  it("", async () => {
    const { result } = renderProductInfo();

    const sizeBtn = await waitFor(() =>
      result.container.querySelector("[data-size='S']"),
    );

    if (sizeBtn) {
      fireEvent.click(sizeBtn);
    }
  });
});
