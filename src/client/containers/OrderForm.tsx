import * as React from "react";
import withForm from "../hocs/withForm";
import orderField from "../utils/fields/orderField";
import { Terms2 } from "../components";
import OrderTermsField from "../utils/fields/orderTermsField";
import { IFields } from "../utils/fields/types";
import ico_required_blue from "../../public/img/ico_required_blue.gif";
import { IPaymentInfo } from "../interfaces";
import { useOrderForm } from "../hooks";

interface OrderProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (paymentInfo: IPaymentInfo) => {
      type: string;
      paymentInfo: IPaymentInfo;
    },
  ) => () => void;
  getFormValues: () => {
    recipient: string;
    address: string;
    cellularPhone: string;
    email: string;
    message?: string;
    payment: number;
    pw?: string;
    pw_check?: string;
  };
}

function OrderForm(props: OrderProps) {
  const {
    token,
    isAllProduct,
    cartInfo,
    cartList,
    totalPrice,
    totalSalePrice,
    agreeAllState,
    handleChange,
    checkBoxState,
    setCheckBoxState,
    setAgreeAllState,
    handleSubmitClick,
  } = useOrderForm(props.getFormValues, props.renderElements);

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
                .slice(0, -3)
                .map((formElement: { id: string; config: IFields }) => {
                  return (
                    <tr key={formElement.id}>
                      <th>
                        {`${formElement.config.elementLabel} `}
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
      {!token && (
        <div className="orderForm__password">
          <div className="password__title">
            <h2>비회원 주문조회 비밀번호</h2>
          </div>
          <div className="password__contents">
            <table>
              <tbody>
                {props
                  .renderElements()
                  .slice(-3, -1)
                  .map((formElement: { id: string; config: IFields }) => {
                    return (
                      <tr key={formElement.id}>
                        <th>{`${formElement.config.elementLabel} `}</th>
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
      )}
      <div className="orderForm__product">
        <div className="product__title">
          <h2>주문상품</h2>
        </div>
        <div className="product__contents">
          {isAllProduct
            ? cartInfo.map((info, index) => {
                return (
                  <div className="contents__wrap" key={index}>
                    <div className="wrap__thumbnail">
                      <a href={`/products/${info.category}/${info.productId}`}>
                        <img
                          src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${info.productInfo.image}`}
                        />
                      </a>
                    </div>
                    <div className="wrap__description">
                      <a href={`/products/${info.category}/${info.productId}`}>
                        <strong>{info.productInfo.name}</strong>
                      </a>
                      <ul>
                        <li>
                          <span>{`[옵션: ${info.option}]`}</span>
                        </li>
                        <li>
                          <span>{`수량: ${info.quantity}개`}</span>
                        </li>
                        <li>
                          <span>{`상품구매금액: KRW ${info.productInfo.price}`}</span>
                        </li>
                        <li>
                          <span>{`할인금액: -KRW ${
                            info.productInfo.price - info.productInfo.salePrice
                          }`}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            : cartInfo.map((info, index) => {
                return (
                  cartList.indexOf(index) !== -1 && (
                    <div className="contents__wrap" key={index}>
                      <div className="wrap__thumbnail">
                        <a
                          href={`/products/${info.category}/${info.productId}`}
                        >
                          <img
                            src={`${process.env.REACT_APP_CLOUDFRONT_URI}/${info.productInfo.image}`}
                          />
                        </a>
                      </div>
                      <div className="wrap__description">
                        <a
                          href={`/products/${info.category}/${info.productId}`}
                        >
                          <strong>{info.productInfo.name}</strong>
                        </a>
                        <ul>
                          <li>
                            <span>{`[옵션: ${info.option}]`}</span>
                          </li>
                          <li>
                            <span>{`수량: ${info.quantity}개`}</span>
                          </li>
                          <li>
                            <span>{`상품구매금액: KRW ${info.productInfo.price}`}</span>
                          </li>
                          <li>
                            <span>{`할인금액: -KRW ${
                              info.productInfo.price -
                              info.productInfo.salePrice
                            }`}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )
                );
              })}
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
                    {`KRW `}
                    <span>{totalPrice}</span>
                  </td>
                </tr>
                <tr>
                  <th>할인/부가결제</th>
                  <td>
                    {`-KRW `}
                    <span>{totalSalePrice}</span>
                  </td>
                </tr>
                <tr>
                  <th>배송비</th>
                  <td>
                    {`+KRW `}
                    <span>0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="contents__total">
            <h3>결제금액</h3>
            <strong>
              KRW <span>{totalPrice - totalSalePrice}</span>
            </strong>
          </div>
        </div>
      </div>
      <div className="orderForm__payment-method">
        <div className="payment-method__title">
          <h2>결제수단</h2>
        </div>
        <div className="payment-method__contents">
          {props
            .renderElements()
            .slice(-1)
            .map((formElement: { id: string; config: IFields }) => {
              return (
                <>
                  {formElement.config.getComponent(formElement, props.onChange)}
                </>
              );
            })}
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
        <button onClick={handleSubmitClick}>
          KRW
          <span className="">{` ${totalPrice - totalSalePrice}`}</span>
          <span className="">결제하기</span>
        </button>
      </div>
    </div>
  );
}

export default withForm(orderField)(OrderForm);
