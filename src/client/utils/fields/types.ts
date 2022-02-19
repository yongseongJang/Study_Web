import * as React from "react";

export interface IFields {
  elementLabel: string;
  inputElement: { inputType: string; value: string; validation: IValidation }[];
  valid: boolean;
  errorMessage: string | null;
  info?: string;
  placeholder: string;
  required: boolean;
  getComponent: Function;
}

export interface IValidation {
  required?: boolean;
  id?: boolean;
  pw?: boolean;
  email?: boolean;
  phoneNumberFront?: boolean;
  phoneNumber?: boolean;
}

export interface ITerms {
  head: string;
  content: Array<string>;
  tail: Array<string>;
  required: boolean;
  errorMessage?: string;
}
