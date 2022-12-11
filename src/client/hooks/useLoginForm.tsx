import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../reducers/loginReducer";
import { loginSelectors } from "../selectors";
import { ILoginInfo } from "../interfaces";
import { IFields } from "../utils/fields/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const useLoginForm = (
  submit: (
    action: ActionCreatorWithPayload<{ loginInfo: ILoginInfo }, "login/login">,
    key: string,
  ) => () => void,
  renderElements: () => [],
) => {
  const dispatch = useDispatch();

  const error = useSelector(loginSelectors.selectError);

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => {
    e.preventDefault();

    const errorMessages = renderElements()
      .map(
        (formElement: { id: string; config: IFields }) =>
          formElement.config.errorMessage,
      )
      .filter((errorMessage: string | null) => !!errorMessage);
    if (errorMessages.length) {
      alert(errorMessages[0]);
    } else {
      submit(loginActions.login, "loginInfo")();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitClick(e);
    }
  };

  const handleLoginError = () => {
    alert("아이디 혹은 비밀번호가 일치하지 않습니다.");

    dispatch(loginActions.resetError());
  };

  return {
    error,
    handleSubmitClick,
    handleKeyPress,
    handleLoginError,
  };
};

export default useLoginForm;
