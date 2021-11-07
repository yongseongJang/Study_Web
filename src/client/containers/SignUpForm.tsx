import * as React from "react";
import { useState, useMemo } from "react";
import withForm from "../hocs/withForm";
import signUpField from "../utils/fields/signUpField";
import { Input } from "../components";
import { signUpActions } from "../actions";

import { IFields } from "../utils/fields/types";
import { IUserInfo } from "../interfaces";

interface SignUpProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (userInfo: IUserInfo) => { type: string; userInfo: IUserInfo },
  ) => () => void;
}

function SignUpForm(props: SignUpProps) {
  let errorMessage = "";

  const handleSubmitClick = () => {
    if (errorMessage) {
      alert(errorMessage);
    } else {
      props.submit(signUpActions.signUp);
    }
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
                  onChange={props.onChange}
                  errorMessage={formElement.config.errorMessage}
                />
              </div>
            );
          })}
        <button>BACK</button>
        <button
          className="SignUpForm__Button"
          color="primary"
          type="button"
          onClick={handleSubmitClick}
        >
          JOIN
        </button>
      </form>
    </div>
  );
}

export default withForm(signUpField)(SignUpForm);
