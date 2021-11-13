import * as React from "react";
import { useState, useEffect } from "react";

interface TermsProps {
  head: string;
  content: Array<string>;
  tail: Array<string>;
  agreeAllState?: boolean;
}

function Terms(props: TermsProps) {
  const [checkBoxState, setCheckBoxState] = useState<Array<boolean>>(
    Array(props.tail.length).fill(
      props.agreeAllState ? props.agreeAllState : false,
    ),
  );

  useEffect(() => {
    setCheckBoxState(Array(props.tail.length).fill(props.agreeAllState));
  }, [props.agreeAllState]);

  const handleChange = (e: React.ChangeEvent) => {
    const index = Number(e.target.id.split("_")[2]);

    setCheckBoxState([
      ...checkBoxState.slice(0, index),
      !checkBoxState[index],
      ...checkBoxState.slice(index + 1),
    ]);
  };

  return (
    <div className="Terms__AgreeArea">
      <h3>{props.head}</h3>
      <div className="Terms__AgreeArea__Content">
        <div>
          {props.content.map((phrases, index) => {
            return <p key={index}>{phrases}</p>;
          })}
        </div>
      </div>
      <ul>
        {props.tail.map((value, index) => {
          return (
            <li key={index}>
              <span>{value}</span>
              <input
                id={`terms_check_${index}`}
                type="checkbox"
                onChange={handleChange}
                checked={checkBoxState[index]}
              />
              <label htmlFor="terms_check">동의함</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Terms;
