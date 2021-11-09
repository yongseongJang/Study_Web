import * as React from "react";

interface InputProps {
  label: string;
  id: string;
  type: any;
  value: string;
  onChange: () => void;
}

function Input(props: InputProps) {
  return (
    <div className="Input">
      <label htmlFor={props.id} className="Input__Label">
        <span>{props.label}</span>
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
}

export default Input;
