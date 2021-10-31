import { IFields } from "../../utils/fields/types";

const signUpField: { [key: string]: IFields } = {
  id: {
    elementLabel: "아이디",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      id: true,
      pw: false,
      email: false,
      phoneNumber: false,
    },
    valid: false,
    errorMessage: null,
  },
  pw: {
    elementLabel: "비밀번호",
    inputType: "password",
    value: "",
    validation: {
      required: true,
      pw: true,
      id: false,
      email: false,
      phoneNumber: false,
    },
    valid: false,
    errorMessage: null,
  },
  pw_check: {
    elementLabel: "비밀번호 확인",
    inputType: "password",
    value: "",
    validation: {
      required: true,
      id: false,
      pw: false,
      email: false,
      phoneNumber: false,
    },
    valid: false,
    errorMessage: null,
  },
  name: {
    elementLabel: "이름",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      id: false,
      pw: false,
      email: false,
      phoneNumber: false,
    },
    valid: false,
    errorMessage: null,
  },
  phoneNumber: {
    elementLabel: "휴대전화",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      phoneNumber: true,
      id: false,
      pw: false,
      email: false,
    },
    valid: false,
    errorMessage: null,
  },
  email: {
    elementLabel: "이메일",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      email: true,
      id: false,
      pw: false,
      phoneNumber: false,
    },
    valid: false,
    errorMessage: null,
  },
};

export default signUpField;
