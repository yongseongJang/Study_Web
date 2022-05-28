import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import orderTermsField from "../utils/fields/orderTermsField";
import { orderActions } from "../actions";
import { ICartInfo } from "../interfaces";
import OrderTermsField from "../utils/fields/orderTermsField";
import { IFields } from "../utils/fields/types";

const useOrderForm = (
  getFormValues: () => {
    recipient: string;
    address: string;
    cellularPhone: string;
    email: string;
    message?: string;
    payment: number;
    pw?: string;
    pw_check?: string;
  },
  renderElements: () => [],
) => {
  const [checkBoxState, setCheckBoxState] = useState<boolean[]>(
    Array(OrderTermsField.length).fill(false),
  );
  const [agreeAllState, setAgreeAllState] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [cookies] = useCookies([
    "uniformbridge_token",
    "cartInfo",
    "cartList",
    "isAllProduct",
  ]);
  const token = cookies.uniformbridge_token;
  const cartInfo: ICartInfo[] = cookies.cartInfo;
  const isAllProduct = cookies.isAllProduct;
  const cartList = cookies.cartList;

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

    const formValues = getFormValues();
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

  return {
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
  };
};

export default useOrderForm;
