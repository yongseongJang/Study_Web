import * as React from "react";
import withForm from "../hocs/withForm";
import signUpField from "../utils/fields/signUpField";
import { Input } from "../components";
import { IFields } from "../utils/fields/types";

interface SignUpProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: () => () => void;
}

function SignUpForm(props: SignUpProps) {
  return (
    <div className="SignUpForm">
      <form>
        {props
          .renderElements()
          .map((formElement: { id: string; config: IFields }) => {
            return (
              <div key={formElement.id} className="SignUpForm__Input__Wrapper">
                <Input
                  id={formElement.id}
                  label={formElement.config.elementLabel}
                  type={formElement.config.inputType}
                  value={formElement.config.value}
                  onChange={props.onChange}
                  errorMessage={formElement.config.errorMessage}
                />
              </div>
            );
          })}
        <button className="SignUpForm__Button">BACK</button>
        <button className="SignUpForm__Button">JOIN</button>
      </form>
    </div>
  );
}

export default withForm(signUpField)(SignUpForm);
