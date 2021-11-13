import * as React from "react";

interface TermsProps {
  index: number;
  head: string;
  content: Array<string>;
  tail: Array<string>;
  checkBoxState: boolean[][];
  setCheckBoxState: React.Dispatch<React.SetStateAction<boolean[][]>>;
  agreeAllState: boolean;
  setAgreeAllState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Terms(props: TermsProps) {
  const handleCheckBox = (e: React.ChangeEvent) => {
    const index = Number(e.target.id.split("_")[3]);

    if (props.agreeAllState && props.checkBoxState[props.index][index]) {
      props.setAgreeAllState(false);
    }

    props.setCheckBoxState([
      ...props.checkBoxState.slice(0, props.index),
      [
        ...props.checkBoxState[props.index].slice(0, index),
        !props.checkBoxState[props.index][index],
        ...props.checkBoxState[props.index].slice(index + 1),
      ],
      ...props.checkBoxState.slice(props.index + 1),
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
                id={`terms_check_${props.index}_${index}`}
                type="checkbox"
                onChange={handleCheckBox}
                checked={props.checkBoxState[props.index][index]}
              />
              <label htmlFor={`terms_check_${props.index}_${index}`}>
                동의함
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Terms;
