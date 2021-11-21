import { IFields } from "../../utils/fields/types";

const loginField: { [key: string]: IFields } = {
  id: {
    inputType: "text",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "ID 항목은 필수 입력값입니다.",
    placeholder: "아이디",
  },
  password: {
    inputType: "password",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "PASSWORD 항목은 필수 입력값입니다.",
    placeholder: "비밀번호",
  },
};

export default loginField;
