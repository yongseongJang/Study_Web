import * as React from "react";
import { useState } from "react";

interface Terms2Props {
  index: number;
  head: string;
  content: Array<string>;
  required: boolean;
  checkBoxState: boolean[];
  setCheckBoxState: React.Dispatch<React.SetStateAction<boolean[]>>;
  agreeAllState: boolean;
  setAgreeAllState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Terms2(props: Terms2Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent) => {
    if (props.agreeAllState && props.checkBoxState[props.index]) {
      props.setAgreeAllState(false);
    }

    props.setCheckBoxState([
      ...props.checkBoxState.slice(0, props.index),
      !props.checkBoxState[props.index],
      ...props.checkBoxState.slice(props.index + 1),
    ]);
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="terms2">
      {isVisible && (
        <div className="terms2__popup">
          <div className="popup__modal">
            <div className="modal__header">
              <h3>{props.head}</h3>
              <span className="header__closeBtn" onClick={handleClick}>
                <span className="closeBtn__wrap">
                  <span className="wrap__line1"></span>
                  <span className="wrap__line2"></span>
                </span>
              </span>
            </div>
            <div className="modal__content">
              <div className="content__wrap">
                {props.content.map((value, index) => {
                  return <p key={index}>{value}</p>;
                })}
              </div>
            </div>
            <div className="modal__bottom">
              <button onClick={handleClick}>확인</button>
            </div>
          </div>
        </div>
      )}
      <div className="agree">
        <span className="agree__check">
          <input
            type="checkbox"
            id={`term_${props.index}`}
            checked={props.checkBoxState[props.index]}
            onChange={handleChange}
          />
          <label htmlFor={`term_${props.index}`}>
            <span>{props.required && "[필수]"} </span>
            {props.head}
          </label>
        </span>
        <a className="showTerm" onClick={handleClick}></a>
      </div>
    </div>
  );
}

export default Terms2;
