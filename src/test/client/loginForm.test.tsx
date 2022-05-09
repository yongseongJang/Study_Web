import * as React from "react";
import { render, fireEvent } from "./test-utils";
import { LoginForm } from "../../client/containers";

function renderLoginForm() {
  const onChange = jest.fn();
  const submit = jest.fn();
  window.alert = jest.fn();

  const result = render(
    <LoginForm
      onChange={onChange}
      submit={submit}
      isValideForm={true}
      renderElement={jest.fn()}
    />,
  );

  const loginBtn = () => result.getByText("LOGIN");
  const registerBtn = () => result.getByText("REGISTER");

  const clickLoginBtn = () => {
    fireEvent.click(loginBtn());
  };

  return {
    onChange,
    submit,
    loginBtn,
    registerBtn,
    clickLoginBtn,
  };
}

describe("<LoginForm />", () => {
  it("renders component correctly", () => {
    const { loginBtn, registerBtn } = renderLoginForm();

    expect(loginBtn()).toBeInTheDocument();
    expect(registerBtn()).toBeInTheDocument();
  });

  it("when the login button is clicked with out input, window alert should appear", () => {
    const { clickLoginBtn } = renderLoginForm();

    clickLoginBtn();

    expect(window.alert).toHaveBeenCalled();
  });
});
