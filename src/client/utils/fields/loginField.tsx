import * as React from "react";
import { IFields } from "../../utils/fields/types";
import { Input } from "../../components";

const loginField: { [key: string]: Omit<IFields, "elementLabel" | "info"> } = {
  id: {
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
    errorMessage: "ID 항목은 필수 입력값입니다.",
    required: true,
    placeholder: "아이디",
    getComponent: getInputComponent,
  },
  pw: {
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
    errorMessage: "PASSWORD 항목은 필수 입력값입니다.",
    required: true,
    placeholder: "비밀번호",
    getComponent: getInputComponent,
  },
};

function getInputComponent(
  formElement: { id: string; config: IFields },
  onChange: () => void,
  onKeyPress: () => void,
) {
  return formElement.config.inputElement.map((element) => {
    return (
      <Input
        key={formElement.id}
        id={formElement.id}
        label={""}
        type={element.inputType}
        value={element.value}
        info={formElement.config.info}
        placeholder={formElement.config.placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    );
  });
}
export default loginField;
