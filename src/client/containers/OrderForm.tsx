import * as React from "react";
import { useState } from "react";
import withForm from "../hocs/withForm";
import orderField from "../utils/fields/orderField";
import { Terms2 } from "../components";
import OrderTermsField from "../utils/fields/orderTermsField";
import { IFields } from "../utils/fields/types";
import ico_required_blue from "../../public/img/ico_required_blue.gif";

interface OrderProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (action: () => {}) => () => void;
}

function OrderForm(props: OrderProps) {
  const [checkBoxState, setCheckBoxState] = useState<boolean[]>(
    Array(OrderTermsField.length).fill(false),
  );
  const [agreeAllState, setAgreeAllState] = useState<boolean>(false);

  let errorMessage = "";

  const handleChange = (e: React.ChangeEvent) => {
    setCheckBoxState(Array(OrderTermsField.length).fill(!agreeAllState));

    setAgreeAllState(!agreeAllState);
  };

  return (
    <div className="orderForm">
      <div className="orderForm__recipientInfo">
        <div className="recipientInfo__title">
          <h2>배송지</h2>
        </div>
        <div className="recipientInfo__contents">
          <table>
            <tbody>
              {props
                .renderElements()
                .map((formElement: { id: string; config: IFields }) => {
                  if (formElement.config.errorMessage) {
                    errorMessage = formElement.config.errorMessage;
                  }

                  return (
                    <tr key={formElement.id}>
                      <th>
                        {`${formElement.config.elementLabel}`}
                        {formElement.config.required && (
                          <img src={ico_required_blue} alt="필수" />
                        )}
                      </th>
                      <td>
                        {formElement.config.getComponent(
                          formElement,
                          props.onChange,
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="orderForm__product">
        <div className="product__title">
          <h2>주문상품</h2>
        </div>
        <div className="product__contents">
          <div className="contents__wrap">
            <div className="wrap__thumbnail">
              <a href="">
                <img src="" alt="" />
              </a>
            </div>
            <div className="wrap__description">
              <strong></strong>
              <ul>
                <li>
                  <span>{`[옵션: ]`}</span>
                </li>
                <li>
                  <span>{`수량: 개`}</span>
                </li>
                <li>
                  <span>{`상품구매금액: KRW`}</span>
                </li>
              </ul>
            </div>
            <button className="wrap__removeBtn"></button>
          </div>
        </div>
      </div>
      <div className="orderForm__payment">
        <div className="payment__title">
          <h2>결제정보</h2>
        </div>
        <div className="payment__contents">
          <div className="contents__details">
            <table>
              <colgroup>
                <col style={{ width: "122px" }} />
                <col style={{ width: "auto" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>주문상품</th>
                  <td>
                    <span>KRW</span>
                  </td>
                </tr>
                <tr>
                  <th>할인/부가결제</th>
                  <td>
                    {`+KRW`}
                    <span>0</span>
                  </td>
                </tr>
                <tr>
                  <th>배송비</th>
                  <td>
                    {`+KRW`}
                    <span>0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="contents__total">
            <h3>결제금액</h3>
            <strong>
              {`KRW `} <span></span>
            </strong>
          </div>
        </div>
      </div>
      <div className="orderForm__agreement">
        <div className="agreement__allAgree">
          <input
            type="checkbox"
            id="allAgree"
            checked={agreeAllState}
            onChange={handleChange}
          />
          <label htmlFor="allAgree">
            <strong>모든 약관 동의</strong>
          </label>
        </div>
        <div className="agreement__agree">
          <ul>
            {OrderTermsField.map((term, index) => {
              return (
                <li key={index}>
                  <Terms2
                    index={index}
                    head={term.head}
                    content={term.content}
                    required={term.required}
                    checkBoxState={checkBoxState}
                    setCheckBoxState={setCheckBoxState}
                    agreeAllState={agreeAllState}
                    setAgreeAllState={setAgreeAllState}
                  ></Terms2>
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
