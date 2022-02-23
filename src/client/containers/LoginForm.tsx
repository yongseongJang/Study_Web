import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import withForm from "../hocs/withForm";
import loginField from "../utils/fields/loginField";
import { loginActions } from "../actions";
import { IFields } from "../utils/fields/types";
import { ILoginInfo } from "../interfaces";
import { RootState } from "../reducers/types";
import "../styles/Login.scss";

interface LoginProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (loginInfo: ILoginInfo) => {
      type: string;
      loginInfo: ILoginInfo;
    },
  ) => () => void;
}

function LoginForm(props: LoginProps) {
  const dispatch = useDispatch();
  let errorMessage = "";

  const error = useSelector((state: RootState) => state.loginReducer.error);

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => {
    e.preventDefault();

    if (errorMessage) {
      alert(errorMessage);
    } else {
      props.submit(loginActions.login)();
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

  return (
    <div className="login-form">
      {error ? handleLoginError() : null}
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            if (formElement.config.errorMessage) {
              errorMessage = formElement.config.errorMessage;
            }
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
