import * as React from "react";
import { useState } from "react";
import { signUpActions } from "../actions";
import { IUserInfo } from "../interfaces";
import signUpTermsField from "../utils/fields/signUpTermsField";
import { IFields } from "../utils/fields/types";

const useSignUpForm = (
  submit: (
    action: (userInfo: IUserInfo) => {
      type: string;
      payload: {
        userInfo: IUserInfo;
      };
    },
  ) => () => void,
  renderElements: () => [],
) => {
  const termsLen = signUpTermsField.length;
  const [agreeAllState, setAgreeAllState] = useState<boolean>(false);
  const [checkBoxState, setCheckBoxState] = useState<boolean[][]>(
    Array(termsLen)
      .fill(null)
      .map((v, i) => Array(signUpTermsField[i].tail.length).fill(false)),
  );

  const handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const errorMessages = renderElements()
      .map(
        (formElement: { id: string; config: IFields }) =>
          formElement.config.errorMessage,
      )
      .filter((errorMessage: string | null) => !!errorMessage);

    if (errorMessages.length) {
      alert(errorMessages[0]);
      return;
    }

    const passwordForm = renderElements()
      .map((formElement: { id: string; config: IFields }) => {
        return formElement.id === "pw" || formElement.id === "pw_check"
          ? formElement.config.inputElement[0].value
          : "";
      })
      .filter((formValue: string) => !!formValue);

    if (passwordForm[0] !== passwordForm[1]) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    for (let i = 0; i < termsLen; i++) {
      if (!signUpTermsField[i].required) continue;

      if (checkBoxState[i].indexOf(false) != -1) {
        alert(signUpTermsField[i].errorMessage);
        return;
      }
    }

    submit(signUpActions.signUp)();
  };

  const handleAgreeAll = () => {
    setAgreeAllState(!agreeAllState);
    setCheckBoxState(
      Array(termsLen)
        .fill(null)
        .map((v, i) =>
          Array(signUpTermsField[i].tail.length).fill(!agreeAllState),
        ),
    );
  };

  return {
    agreeAllState,
    handleAgreeAll,
    checkBoxState,
    setCheckBoxState,
    setAgreeAllState,
    handleSubmitClick,
  };
};

export default useSignUpForm;
