import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validate } from "../utils/validations";
import { IFields } from "../utils/fields/types";

const withForm =
  (formInitialData: { [key: string]: IFields }) =>
  (WrappedComponent: (props: any) => JSX.Element) => {
    return (props: any) => {
      const dispatch = useDispatch();
      const [formState, setFormState] = useState<{ [key: string]: IFields }>({
        ...formInitialData,
      });
      const [formValidation, setFormValidation] = useState<boolean>(false);

      const renderElements = (): Array<object> => {
        const formElements = [];
        for (const key in formState) {
          formElements.push({
            id: key,
            config: formState[key],
          });
        }

        return formElements;
      };

      const isFormValid = (form: { [key: string]: IFields }): boolean => {
        let isValid = true;

        for (const formElement in form) {
          isValid = isValid && form[formElement].valid;
        }

        return isValid;
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const key = e.target.id;
        const elementLabel = formState[key].elementLabel;

        const index = e.currentTarget.getAttribute("data-index")
          ? Number(e.currentTarget.getAttribute("data-index"))
          : 0;

        const validation = validate(
          elementLabel,
          inputValue,
          formState[key].inputElement[index].validation,
        );

        const formData = {
          ...formState,
          [key]: {
            ...formState[key],
            inputElement: [
              ...formState[key].inputElement.slice(0, index),
              {
                ...formState[key].inputElement[index],
                value: inputValue,
              },
              ...formState[key].inputElement.slice(index + 1),
            ],
            valid: validation.isValid,
            errorMessage: validation.error,
          },
        };

        setFormState(formData);
        setFormValidation(isFormValid(formData));
      };

      const getFormValues = (): object => {
        let formValues = {};

        for (const key in formState) {
          let delemeter = " ";
          switch (key) {
            case "cellularPhone":
              delemeter = "-";
              break;
            default:
              delemeter = " ";
              break;
          }

          const value = formState[key].inputElement
            .map((element) => {
              return element.value;
            })
            .join(delemeter);

          formValues = { ...formValues, [key]: value };
        }
        return formValues;
      };

      const submit =
        (action: (payload: any) => { type: string; payload: any }) => () => {
          const formValues = getFormValues();
          dispatch(action(formValues));
        };

      return (
        <WrappedComponent
          {...props}
          renderElements={renderElements}
          isValidForm={formValidation}
          onChange={handleChange}
          submit={submit}
        />
      );
    };
  };

export default withForm;
