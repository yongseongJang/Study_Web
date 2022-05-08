import * as React from "react";
import { render } from "./test-utils";
import { Login } from "../../client/pages";

describe("<Login />", () => {
  it("renders component correctly", () => {
    const match = { url: "/member/login" };
    const { getAllByText } = render(<Login match={match} />);
    expect(getAllByText("Login")[0]).toBeInTheDocument();
  });
});
