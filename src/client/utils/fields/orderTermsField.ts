import { ITerms } from "../../utils/fields/types";

const orderTermsField: Array<Omit<ITerms, "tail">> = [
  {
    head: "[필수] 쇼핑몰 이용약관 동의",
    content: [
      "표준약관 제10023호",
      "부칙",
      "이 약관은 2013년 05월 30일부터 적용됩니다.",
    ],
    required: true,
    errorMessage: "쇼핑몰 이용약관에 동의하세요",
  },
  {
    head: "[필수] 비회원 구매시 개인정보 처리방침 동의",
    content: ["1. 개인정보 수집목적 및 이용목적 : 비회원 구매 서비스 제공"],
    required: true,
    errorMessage: "비회원 구매시 개인정보 처리방침에 동의하세요",
  },
];

export default orderTermsField;
