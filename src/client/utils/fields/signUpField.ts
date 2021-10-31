export default {
  id: {
    elementLabel: "아이디",
    inputType: "text",
    value: "",
    validation: {
      required: true,
      id: true,
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
      pwCheck: true,
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
    },
    valid: false,
    errorMessage: null,
  },
};
