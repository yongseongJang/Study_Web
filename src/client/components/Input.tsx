import * as React from "react";

interface InputProps {
  label?: string;
  id: string;
  type: any;
  value: string;
  info?: string;
  placeholder?: string;
  onChange: () => void;
}

function Input(props: InputProps) {
  return (
    <label htmlFor={props.id} className="input__label">
      {props.label ? <span>{props.label}</span> : ""}
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete="off"
      />
      {props.info ? <span className="label__info">{props.info}</span> : ""}
    </label>
  );
}

export default Input;
