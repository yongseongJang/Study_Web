import React = require("react");

export interface IFields {
  elementLabel?: string;
  inputType: string;
  value: string;
  validation: IValidation;
  valid: boolean;
  errorMessage: string | null;
  info?: string;
  placeholder?: string;
}

export interface IValidation {
  required?: boolean;
  id?: boolean;
  pw?: boolean;
  email?: boolean;
  phoneNumber?: boolean;
}

export interface ITerms {
  head: string;
  content: Array<string>;
  tail: Array<string>;
  required: boolean;
  errorMessage?: string;
}
