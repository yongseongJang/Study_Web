import * as React from "react";

interface InputProps {
  label: string;
  id: string;
  type: any;
  value: string;
  onChange: () => void;
  errorMessage: string | null;
}

function Input(props: InputProps) {
  return (
    <div className="Input">
      <label htmlFor={props.id} className="Input__Label">
        {props.label}
      </label>
      <input
        className="Input__Form"
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <p className="Input__Error">{props.errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
