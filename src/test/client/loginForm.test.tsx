import * as React from "react";
import { render, fireEvent, waitFor } from "./test-utils";
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
  const idInput = () => result.getByPlaceholderText("아이디");
  const pwInput = () => result.getByPlaceholderText("비밀번호");

  const clickLoginBtn = () => {
    fireEvent.click(loginBtn());
  };

  const clickRegisterBtn = () => {
    fireEvent.click(registerBtn());
  };

  const enterId = () => {
    const inputElement = idInput();
    fireEvent.change(inputElement, { target: { value: "testing" } });
  };

  const enterIncorrectPW = () => {
    const inputElement = pwInput();
    fireEvent.change(inputElement, { target: { value: "reacttest" } });
  };

  const enterCorrectPW = () => {
    const inputElement = pwInput();
    fireEvent.change(inputElement, { target: { value: "!@reacttesting" } });
  };

  return {
    onChange,
    submit,
    loginBtn,
    registerBtn,
    clickLoginBtn,
    clickRegisterBtn,
    enterId,
    enterIncorrectPW,
    enterCorrectPW,
    result,
  };
}

describe("<LoginForm />", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { REACT_APP_API_URI: "https://yongseongjang.com" };
  });

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

  it("when the login button is clicked with incorrect PW, window alert should appear", async () => {
    const { enterId, enterIncorrectPW, clickLoginBtn } = renderLoginForm();

    enterId();
    enterIncorrectPW();

    clickLoginBtn();

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });

  it("when the login button is clicked with correct ID and PW, window alert should not appear", async () => {
    const { enterId, enterCorrectPW, clickLoginBtn } = renderLoginForm();

    enterId();
    enterCorrectPW();

    clickLoginBtn();

    await waitFor(() => expect(window.alert).not.toHaveBeenCalled());
  });
});
