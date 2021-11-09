import { IFields } from "../../utils/fields/types";

const loginField: { [key: string]: IFields } = {
  id: {
    elementLabel: "ID",
    inputType: "text",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "ID 항목은 필수 입력값입니다.",
  },
  password: {
    elementLabel: "PASSWORD",
    inputType: "password",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "PASSWORD 항목은 필수 입력값입니다.",
  },
};

export default loginField;
