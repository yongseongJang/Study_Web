import * as React from "react";
import withForm from "../hocs/withForm";
import loginField from "../utils/fields/loginField";
import { IFields } from "../utils/fields/types";
import { ILoginInfo } from "../interfaces";
import { useLogin } from "../hooks";
import "../styles/Login.scss";

interface LoginProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (loginInfo: ILoginInfo) => {
      type: string;
      payload: {
        loginInfo: ILoginInfo;
      };
    },
  ) => () => void;
}

function LoginForm(props: LoginProps) {
  const { error, handleSubmitClick, handleKeyPress, handleLoginError } =
    useLogin(props.submit, props.renderElements);

  return (
    <div className="login-form">
      {error && handleLoginError()}
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            return (
              <div key={formElement.id} className="login-form__input-wrapper">
                {formElement.config.getComponent(
                  formElement,
                  props.onChange,
                  handleKeyPress,
                )}
              </div>
            );
          })}

        <div className="login-form__sub-menu">
          <a href="">아이디찾기</a>
          <a href="">비밀번호찾기</a>
        </div>
        <p>
          <a href="" className="btn-login" onClick={handleSubmitClick}>
            LOGIN
          </a>
          <a href="/member/join" className="btn-agree">
            REGISTER
          </a>
        </p>
      </form>
    </div>
  );
}

export default withForm(loginField)(LoginForm);
