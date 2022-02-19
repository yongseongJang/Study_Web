import * as React from "react";
import { IValidation } from "../utils/fields/types";

interface PhoneNumberProps {
  id: string;
  label: string;
  element: {
    inputType: string;
    value: string;
    validation: IValidation;
  }[];
  info: string | undefined;
  onChange: () => void;
}

function PhoneNumber(props: PhoneNumberProps) {
  return (
    <>
      <label htmlFor={props.id} className="input__label">
        {props.label ? <span>{props.label}</span> : ""}
        <input
          id={props.id}
          data-index={0}
          type="text"
          value={props.element[0].value}
          onChange={props.onChange}
          autoComplete="off"
          maxLength={3}
        />
        {" - "}
        <input
          id={props.id}
          data-index={1}
          type="text"
          value={props.element[1].value}
          onChange={props.onChange}
          autoComplete="off"
          maxLength={4}
        />
        {" - "}
        <input
          id={props.id}
          data-index={2}
          type="text"
          value={props.element[2].value}
          onChange={props.onChange}
          autoComplete="off"
          maxLength={4}
        />
        {props.info ? <span className="label__info">{props.info}</span> : ""}
      </label>
    </>
  );
}

export default PhoneNumber;
