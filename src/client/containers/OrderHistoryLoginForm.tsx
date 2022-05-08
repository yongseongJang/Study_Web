import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import withForm from "../hocs/withForm";
import nonMemberLoginField from "../utils/fields/nonMemberLoginField";
import { orderActions } from "../actions";
import { IFields } from "../utils/fields/types";
import { INonMemberInfo } from "../interfaces";
import { orderSelectors } from "../selectors";

interface OrderHistoryLoginFormProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (nonMemberInfo: INonMemberInfo) => {
      type: string;
      payload: {
        nonMemberInfo: INonMemberInfo;
      };
    },
  ) => () => void;
}

function OrderHistoryLoginForm(props: OrderHistoryLoginFormProps) {
  const dispatch = useDispatch();
  let errorMessage = "";

  const error = useSelector(orderSelectors.selectError);

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
  ) => {
    e.preventDefault();

    if (errorMessage) {
      alert(errorMessage);
    } else {
      props.submit(orderActions.requestNonMemberOrderInfo)();
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
    <div className="login-form">
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
