import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../actions";
import { loginSelectors } from "../selectors";
import { ILoginInfo } from "../interfaces";
import { IFields } from "../utils/fields/types";

const useLoginForm = (
  submit: (
    action: (loginInfo: ILoginInfo) => {
      type: string;
      payload: {
        loginInfo: ILoginInfo;
      };
    },
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
    if (errorMessages.length > 0) {
      alert(errorMessages[0]);
    } else {
      submit(loginActions.login)();
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
