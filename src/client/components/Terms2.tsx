import * as React from "react";

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

  return (
    <div className="terms2">
      <div className="agree">
        <span className="agree__check">
          <input
            type="checkbox"
            id={`term_${props.index}`}
            checked={props.checkBoxState[props.index]}
            onChange={handleChange}
          />
          <label htmlFor={`term_${props.index}`}>
            <span>{props.required ? "[필수]" : ""} </span>
            {props.head}
          </label>
        </span>
        <a className="btnAgree"></a>
      </div>
    </div>
  );
}

export default Terms2;
