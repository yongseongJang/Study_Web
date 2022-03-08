import * as React from "react";
import { useState, useRef } from "react";
import DaumPostCode from "react-daum-postcode";
import { Address } from "react-daum-postcode";

interface AddressFormProps {
  id: string;
  info: string | undefined;
  onChange: () => void;
}

function AddressForm(props: AddressFormProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const postCodeRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsVisible(true);
  };

  const handleComplete = (address: Address) => {
    const postcode = address.zonecode;
    const addr =
      address.userSelectedType === "R"
        ? address.roadAddress
        : address.jibunAddress;

    if (postCodeRef.current) {
      postCodeRef.current.setAttribute("value", postcode);
      postCodeRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (addressRef.current) {
      addressRef.current.setAttribute("value", addr);
      addressRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }

    setIsVisible(false);
  };

  const handleCloseBtnClick = (e: React.MouseEvent) => {
    setIsVisible(false);
  };

  return (
    <label className="input__label">
      <div className="addressForm">
        {isVisible && (
          <div className="addressForm__popup">
            <div className="popup__header">
              <h3>주소 검색</h3>
              <span className="header__closeBtn" onClick={handleCloseBtnClick}>
                <span className="closeBtn__wrap">
                  <span className="wrap__line1"></span>
                  <span className="wrap__line2"></span>
                </span>
              </span>
            </div>
            <DaumPostCode onComplete={handleComplete}></DaumPostCode>
          </div>
        )}
        <input
          type="text"
          id={props.id}
          data-index="0"
          className="addressForm__postcode"
          onChange={props.onChange}
          ref={postCodeRef}
          placeholder="우편번호"
          readOnly
        />
        <button className="addressForm__searchBtn" onClick={handleClick}>
          주소검색
        </button>
        <input
          type="text"
          id={props.id}
          data-index="1"
          className="addressForm__address"
          onChange={props.onChange}
          ref={addressRef}
          placeholder="기본주소"
          readOnly
        />
        <input
          type="text"
          id={props.id}
          data-index="2"
          className="addressForm__detailAddress"
          onChange={props.onChange}
          placeholder="나머지 주소"
        />
      </div>
    </label>
  );
}

export default AddressForm;
