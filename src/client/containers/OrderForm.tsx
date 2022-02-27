import * as React from "react";
import withForm from "../hocs/withForm";
import orderField from "../utils/fields/orderField";
import { Terms2 } from "../components";
import OrderTermsField from "../utils/fields/orderTermsField";

interface OrderProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (action: () => {}) => () => void;
}

function OrderForm(props: OrderProps) {
  return (
    <div className="orderForm">
      <div className="orderForm__recipientInfo"></div>
      <div className="orderForm__product"></div>
      <div className="orderForm__payment"></div>
      <div className="orderForm__agreement">
        <div className="agreement__allAgree">
          <input type="checkbox" id="allAgree" />
          <label htmlFor="allAgree">
            <strong>모든 약관 동의</strong>
          </label>
        </div>
        <div className="agreement__agree">
          <ul>
            {OrderTermsField.map((term, index) => {
              return (
                <li key={index}>
                  <Terms2></Terms2>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="orderForm__submitBtn">
        <button>
          KRW
          <span className="">140,000</span>
          <span className="">결제하기</span>
        </button>
      </div>
    </div>
  );
}

export default withForm(orderField)(OrderForm);
