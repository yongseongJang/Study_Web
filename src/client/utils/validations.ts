import { IValidation } from "./fields/types";

export const validate = (
  value: string,
  rules: IValidation,
): { isValid: boolean; error: string | null } => {
  let isValid = true;
  let error = null;

  if (!rules) {
    return { isValid, error };
  }

  if (rules.required) {
    isValid = value.trim() !== "";
    if (!isValid) {
      error = "this field is required";
      return { isValid, error };
    }
  }

  if (rules.id) {
    if (value.match(/{1,3}/)) {
      isValid = false;
      error = "아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.";
    } else if (
      value.match(/^[0-9]/) ||
      value.match(/[0-9]/) ||
      value.search(/\s/) == -1 ||
      value.match(/[`~!@#$%^&*()-_=+|?;:'",.<>{}[\]\\/]/)
    ) {
      isValid = false;
      error =
        "공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다.";
    }
  } else if (rules.pw) {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()-_={}[\]|;:<>,.?//])[A-Za-z\d`~!@#$%^&*()-_={}[\]|;:<>,.?//]{10.16}$/;

    if (regExp.test(value)) {
      isValid = false;
    }

    if (!isValid) {
      error =
        "대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자 / 입력 가능 특수문자 `~!@#$%^&*()-_={}[]|;:<>,.?/";
    }
  } else if (rules.email) {
    const regExp =
      /^[0-9a-zA-Z]([0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    isValid = regExp.test(value);

    if (!isValid) {
      error = "올바른 이메일 주소를 입력해 주세요.";
    }
  } else if (rules.phoneNumber) {
    const regExp = /^\d{3}-\d{4}-\d{4}$/;

    isValid = regExp.test(value);

    if (!isValid) {
      error = "올바른 휴대전화 번호를 입력해 주세요.";
    }
  }

  return { isValid, error };
};
