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
    <div className="LoginForm">
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            if (formElement.config.errorMessage) {
              errorMessage = formElement.config.errorMessage;
            }
            return (
              <div key={formElement.id} className="LoginForm__Input_Wrapper">
                <Input
                  id={formElement.id}
                  label={formElement.config.elementLabel}
                  type={formElement.config.inputType}
                  value={formElement.config.value}
                  onChange={props.onChange}
                />
              </div>
            );
          })}

        <a className="Submit" onClick={handleSubmitClick}>
          SIGN IN
        </a>
        <ul>
          <li className="Forgot">
            {"Forgot your "}
            <a href="#none">ID?</a>
            {" or "}
            <a href="#none" className="right">
              PASSWORD?
            </a>
          </li>
          <li className="Join">
            <a href="/signup">CREATE ACCOUNT</a>
          </li>
          <li className="">
            <a href="">
              <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/member/btn_kakao_login.gif" />
            </a>
          </li>
          <li className="">
            <a href="">
              <img src="http://img.echosting.cafe24.com/skin/base_ko_KR/member/btn_naver_login.gif" />
            </a>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default withForm(loginField)(LoginForm);
