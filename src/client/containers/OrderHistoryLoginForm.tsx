import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import withForm from "../hocs/withForm";
import nonMemberLoginField from "../utils/fields/nonMemberLoginField";
import { orderActions } from "../actions";
import { IFields } from "../utils/fields/types";
import { ILoginInfo } from "../interfaces";
import { RootState } from "../reducers/types";

interface OrderHistoryLoginFormProps {
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

function OrderHistoryLoginForm(props: OrderHistoryLoginFormProps) {
  const dispatch = useDispatch();
  let errorMessage = "";

  const error = useSelector((state: RootState) => state.orderReducer.error);

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => {
    e.preventDefault();

    if (errorMessage) {
      alert(errorMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitClick(e);
    }
  };

  const handleLoginError = () => {
    alert("아이디 혹은 비밀번호가 일치하지 않습니다.");

    dispatch(orderActions.resetError());
  };

  return (
    <div className="login-from">
      {error && handleLoginError()}
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

        <p>
          <a href="" className="btn-login" onClick={handleSubmitClick}>
            비회원 주문조회
          </a>
        </p>
      </form>
    </div>
  );
}

export default withForm(nonMemberLoginField)(OrderHistoryLoginForm);
