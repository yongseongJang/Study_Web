import * as React from "react";
import withForm from "../hocs/withForm";
import loginField from "../utils/fields/loginField";
import { Input } from "../components";
import { loginActions } from "../actions";

import { IFields } from "../utils/fields/types";
import { ILoginInfo } from "../interfaces";
import "../styles/Login.scss";

interface LoginProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (loginInfo: ILoginInfo) => {
      type: string;
      id: string;
      password: string;
    },
  ) => () => void;
}

function LoginForm(props: LoginProps) {
  let errorMessage = "";

  const handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (errorMessage) {
      alert(errorMessage);
    } else {
      props.submit(loginActions.login)();
    }
  };
  return (
    <div className="login-form">
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            if (formElement.config.errorMessage) {
              errorMessage = formElement.config.errorMessage;
            }
            return (
              <div key={formElement.id} className="login-form__input-wrapper">
                <Input
                  id={formElement.id}
                  label={formElement.config.elementLabel}
                  type={formElement.config.inputType}
                  value={formElement.config.value}
                  info={formElement.config.info}
                  placeholder={formElement.config.placeholder}
                  onChange={props.onChange}
                />
              </div>
            );
          })}

        <div className="login-form__sub-menu">
          <a href="member/id">아이디찾기</a>
          <a href="member/passwd">비밀번호찾기</a>
        </div>
        <p>
          <a href="" className="btn-login">
            LOGIN
          </a>
          <a href="" className="btn-agree">
            REGISTER
          </a>
        </p>
      </form>
    </div>
  );
}

export default withForm(loginField)(LoginForm);
