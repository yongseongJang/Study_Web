import * as React from "react";
import { useState, useEffect, useRef } from "react";

interface PaymentProps {
  id: string;
  info: string | undefined;
  onChange: () => void;
}

const paymentMethods = [
  { method: "card", label: "카드 결제" },
  { method: "phone", label: "휴대폰 결제" },
  { method: "cash", label: "무통장 입금" },
];

function Payment(props: PaymentProps) {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    Array(paymentMethods.length).fill(false),
  );

  const inputRefs = Array(paymentMethods.length)
    .fill(null)
    .map((v) => useRef<HTMLInputElement>(null));

  useEffect(() => {
    setCheckedState([true, ...checkedState.slice(1)]);

    if (inputRefs[0].current) {
      inputRefs[0].current.dispatchEvent(new Event("click", { bubbles: true }));
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute("data-chk-index"));

    setCheckedState([
      ...Array(index).fill(false),
      true,
      ...Array(paymentMethods.length - 1 - index).fill(false),
    ]);

    props.onChange(e);
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute("data-chk-index"));

    if (inputRefs[index].current) {
      inputRefs[index].current.dispatchEvent(
        new Event("click", { bubbles: true }),
      );
    }
  };
  return (
    <div className="payment">
      <div className="payment__wrap">
        {paymentMethods.map((method, index) => {
          return (
            <span key={index}>
              <input
                type="radio"
                id="payment"
                data-chk-index={index}
                ref={inputRefs[index]}
                value={index}
                onClick={handleClick}
                checked={checkedState[index]}
              />
              <label data-chk-index={index} onClick={handleLabelClick}>
                {method.label}
              </label>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Payment;
