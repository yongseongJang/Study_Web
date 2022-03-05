import * as React from "react";
import { IFields } from "../../utils/fields/types";
import { Input, PhoneNumber } from "../../components";
import { AddressForm } from "../../containers";

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
};

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
