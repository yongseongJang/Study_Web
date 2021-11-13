import { IFields } from "../../utils/fields/types";

const signUpField: { [key: string]: IFields } = {
  id: {
    elementLabel: "아이디",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      id: true,
    },
    valid: false,
    errorMessage: "아이디 항목은 필수 입력값입니다.",
    info: "(영문소문자/숫자, 4~16자)",
  },
  pw: {
    elementLabel: "비밀번호",
    inputType: "password",
    value: "",
    validation: {
      required: true,
      pw: true,
    },
    valid: false,
    errorMessage: "비밀번호 항목은 필수 입력값입니다.",
    info: "(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)",
  },
  pw_check: {
    elementLabel: "비밀번호 확인",
    inputType: "password",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "비밀번호 확인 항목은 필수 입력값입니다.",
  },
  name: {
    elementLabel: "이름",
    inputType: "text",
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    errorMessage: "이름 항목은 필수 입력값입니다.",
  },
  phoneNumber: {
    elementLabel: "휴대전화",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      phoneNumber: true,
    },
    valid: false,
    errorMessage: "휴대전화 항목은 필수 입력값입니다.",
    info: "(010-0000-0000)",
  },
  email: {
    elementLabel: "이메일",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      email: true,
    },
    valid: false,
    errorMessage: "이메일 항목은 필수 입력값입니다.",
  },
};

export default signUpField;
