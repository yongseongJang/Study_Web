import * as React from "react";
import { useState } from "react";
import withForm from "../hocs/withForm";
import signUpField from "../utils/fields/signUpField";
import { Input, Terms } from "../components";
import { signUpActions } from "../actions";

import { IFields } from "../utils/fields/types";
import { IUserInfo } from "../interfaces";
import signUpTermsField from "../utils/fields/signUpTermsField";

interface SignUpProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (userInfo: IUserInfo) => { type: string; userInfo: IUserInfo },
  ) => () => void;
}

function SignUpForm(props: SignUpProps) {
  const [agreeAllState, setAgreeAllState] = useState<boolean>(false);

  let errorMessage = "";

  const handleSubmitClick = () => {
    if (errorMessage) {
      alert(errorMessage);
    } else {
      props.submit(signUpActions.signUp)();
    }
  };

  const handleCheckBox = () => {
    setAgreeAllState(!agreeAllState);
  };

  return (
    <div className="SignUpForm">
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            if (formElement.config.errorMessage) {
              errorMessage = formElement.config.errorMessage;
            }

            return (
              <div key={formElement.id} className="SignUpForm__Input__Wrapper">
                <Input
                  id={formElement.id}
                  label={formElement.config.elementLabel}
                  type={formElement.config.inputType}
                  value={formElement.config.value}
                  info={formElement.config.info}
                  onChange={props.onChange}
                />
              </div>
            );
          })}

        <div className="SignUpForm__AgreeAll">
          <input
            type="checkbox"
            id="agree_all_check"
            onChange={handleCheckBox}
          ></input>
          <label htmlFor="agree_all_check">
            이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두
            동의합니다.
          </label>
        </div>
        {signUpTermsField.map((field, index) => {
          return (
            <Terms
              key={index}
              head={field.head}
              content={field.content}
              tail={field.tail}
              agreeAllState={agreeAllState}
            />
          );
        })}
        <div className="SignUpForm__BtnArea">
          <a className="SignUpForm__BtnArea__Left" href="/">
            BACK
          </a>
          <a
            className="SignUpForm__BtnArea__Right"
            href="#none"
            onClick={handleSubmitClick}
          >
            JOIN
          </a>
        </div>
      </form>
    </div>
  );
}

export default withForm(signUpField)(SignUpForm);
