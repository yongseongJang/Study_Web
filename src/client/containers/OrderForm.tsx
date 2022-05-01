import * as React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import withForm from "../hocs/withForm";
import orderField from "../utils/fields/orderField";
import { Terms2 } from "../components";
import OrderTermsField from "../utils/fields/orderTermsField";
import { IFields } from "../utils/fields/types";
import { RootState } from "../reducers/types";
import ico_required_blue from "../../public/img/ico_required_blue.gif";
import orderTermsField from "../utils/fields/orderTermsField";
import { orderActions } from "../actions";
import { IPaymentInfo } from "../interfaces";
import { cartSelectors } from "../selectors";

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
  const [checkBoxState, setCheckBoxState] = useState<boolean[]>(
    Array(OrderTermsField.length).fill(false),
  );
  const [agreeAllState, setAgreeAllState] = useState<boolean>(false);

  let errorMessage = "";
  let password = "";
  let passwordCheck = "";

  const dispatch = useDispatch();

  const [cookies] = useCookies(["uniformbridge_token"]);
  const token = cookies.uniformbridge_token;
  const cartInfo = useSelector(cartSelectors.selectCartInfo);

  const isAllProduct = useSelector(
    (state: RootState) => state.orderReducer.isAllProduct,
  );
  const cartList = useSelector(
    (state: RootState) => state.orderReducer.cartList,
  );

  const totalPrice = cartInfo.reduce((acc, info, index) => {
    return isAllProduct || cartList.indexOf(index) !== -1
      ? acc + info.productInfo.price * info.quantity
      : acc;
  }, 0);

  const totalSalePrice = cartInfo.reduce((acc, info, index) => {
    return isAllProduct || cartList.indexOf(index) !== -1
      ? acc +
          (info.productInfo.price - info.productInfo.salePrice) * info.quantity
      : acc;
  }, 0);

  const handleChange = (e: React.ChangeEvent) => {
    setCheckBoxState(Array(OrderTermsField.length).fill(!agreeAllState));

    setAgreeAllState(!agreeAllState);
  };

  const handleSubmitClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    for (let i = 0; i < orderTermsField.length; i++) {
      if (!orderTermsField[i].required) continue;

      if (!checkBoxState[i]) {
        alert(orderTermsField[i].errorMessage);
        return;
      }
    }

    const orderDetail = isAllProduct
      ? cartInfo.map((info) => {
          return {
            quantity: info.quantity,
            price: info.productInfo.price,
            orderDetailOption: info.option,
            status: 0,
            productId: info.productId,
          };
        })
      : cartInfo
          .filter((info, index) => {
            return cartList.indexOf(index) !== -1;
          })
          .map((info) => {
            return {
              quantity: info.quantity,
              price: info.productInfo.price,
              orderDetailOption: info.option,
              status: 0,
              productId: info.productId,
            };
          });

    const formValues = props.getFormValues();
    formValues.payment = Number(formValues.payment);

    if (token) {
      delete formValues.pw;
      delete formValues.pw_check;

      dispatch(
        orderActions.requestMemberPayment(
          {
            ...formValues,
            price: totalPrice - totalSalePrice,
            orderDetail,
          },
          token,
        ),
      );
    } else {
      dispatch(
        orderActions.requestNonMemberPayment({
          ...formValues,
          price: totalPrice - totalSalePrice,
          orderDetail,
        }),
      );
    }
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
                .slice(0, -3)
                .map((formElement: { id: string; config: IFields }) => {
                  if (formElement.config.errorMessage) {
                    errorMessage = formElement.config.errorMessage;
                  }

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
                    if (formElement.config.errorMessage) {
                      errorMessage = formElement.config.errorMessage;
                    }

                    if (formElement.id === "pw") {
                      password = formElement.config.inputElement[0].value;
                    } else if (formElement.id === "pw_check") {
                      passwordCheck = formElement.config.inputElement[0].value;
                    }

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
              if (formElement.config.errorMessage) {
                errorMessage = formElement.config.errorMessage;
              }

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
          <span className="">140,000</span>
          <span className="">결제하기</span>
        </button>
      </div>
    </div>
  );
}

export default withForm(orderField)(OrderForm);
