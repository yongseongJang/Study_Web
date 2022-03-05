import * as React from "react";
import { IFields } from "../../utils/fields/types";
import { Input, PhoneNumber, Message } from "../../components";
import { AddressForm } from "../../containers";
import { message } from "../message/deliveryMessage";

const orderField: { [key: string]: Omit<IFields, "placeholder"> } = {
  recipient: {
    elementLabel: "받는 사람",
    inputElement: [
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
        },
      },
    ],
    valid: false,
    errorMessage: "받는 사람 항목은 필수 입력값입니다.",
    required: true,
    getComponent: getInputComponent,
  },
  address: {
    elementLabel: "주소",
    inputElement: [
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
        },
      },
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
        },
      },
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
        },
      },
    ],
    valid: false,
    errorMessage: "주소 항목은 필수 입력값입니다.",
    required: true,
    getComponent: getAddressComponent,
  },
  cellularPhone: {
    elementLabel: "휴대전화",
    inputElement: [
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
          phoneNumberFront: true,
        },
      },
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
          phoneNumber: true,
        },
      },
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
          phoneNumber: true,
        },
      },
    ],
    valid: false,
    errorMessage: "휴대전화 항목은 필수 입력값입니다.",
    required: true,
    getComponent: getInputPhoneNumberComponent,
  },
  email: {
    elementLabel: "이메일",
    inputElement: [
      {
        inputType: "text",
        value: "",
        validation: {
          required: true,
          email: true,
        },
      },
    ],
    valid: false,
    errorMessage: "이메일 항목은 필수 입력값입니다.",
    required: true,
    info: "이메일로 주문 처리 과정을 보내드립니다. 수신 가능한 이메일 주소를 입력해주세요.",
    getComponent: getInputComponent,
  },
  message: {
    elementLabel: "배송 메시지",
    inputElement: [
      {
        inputType: "text",
        value: "",
        validation: {},
      },
    ],
    valid: false,
    errorMessage: null,
    required: false,
    getComponent: getMessageComponent,
  },
  pw: {
    elementLabel: "비밀번호",
    inputElement: [
      {
        inputType: "password",
        value: "",
        validation: {
          required: true,
          pw: true,
        },
      },
    ],
    valid: false,
    errorMessage: "비밀번호 항목은 필수 입력값입니다.",
    required: true,
    info: "(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)",
    getComponent: getInputComponent,
  },
  pw_check: {
    elementLabel: "비밀번호 확인",
    inputElement: [
      {
        inputType: "password",
        value: "",
        validation: {
          required: true,
        },
      },
    ],
    valid: false,
    errorMessage: "비밀번호 확인 항목은 필수 입력값입니다.",
    required: true,
    getComponent: getInputComponent,
  },
};

function getMessageComponent(
  formElement: { id: string; config: IFields },
  onChange: () => void,
) {
  return (
    <Message
      messages={message}
      id={formElement.id}
      info={formElement.config.info}
      onChange={onChange}
    ></Message>
  );
}

function getAddressComponent(
  formElement: { id: string; config: IFields },
  onChange: () => void,
) {
  return (
    <AddressForm
      id={formElement.id}
      info={formElement.config.info}
      onChange={onChange}
    ></AddressForm>
  );
}

function getInputPhoneNumberComponent(
  formElement: { id: string; config: IFields },
  onChange: () => void,
) {
  return (
    <PhoneNumber
      key={formElement.id}
      id={formElement.id}
      label={""}
      element={formElement.config.inputElement}
      info={formElement.config.info}
      onChange={onChange}
    />
  );
}

function getInputComponent(
  formElement: { id: string; config: IFields },
  onChange: () => void,
) {
  return formElement.config.inputElement.map((element, index) => {
    return (
      <Input
        key={formElement.id}
        id={formElement.id}
        label={""}
        type={element.inputType}
        value={element.value}
        info={formElement.config.info}
        onChange={onChange}
      />
    );
  });
}

export default orderField;
