import * as React from "react";
import withForm from "../hocs/withForm";
import signUpField from "../utils/fields/signUpField";
import { Terms } from "../components";
import { IFields } from "../utils/fields/types";
import { IUserInfo } from "../interfaces";
import signUpTermsField from "../utils/fields/signUpTermsField";
import ico_required_blue from "../../public/img/ico_required_blue.gif";
import { useSignUpForm } from "../hooks";

interface SignUpProps {
  renderElements: () => [];
  isValidForm: boolean;
  onChange: () => void;
  submit: (
    action: (userInfo: IUserInfo) => {
      type: string;
      payload: { userInfo: IUserInfo };
    },
  ) => () => void;
}

function SignUpForm(props: SignUpProps) {
  const {
    agreeAllState,
    handleAgreeAll,
    checkBoxState,
    setCheckBoxState,
    setAgreeAllState,
    handleSubmitClick,
  } = useSignUpForm(props.submit, props.renderElements);

  return (
    <div className="signup-form">
      <form>
        <div>
          <table>
            <colgroup>
              <col style={{ width: "150px" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  회원구분 <img src={ico_required_blue} alt="필수" />
                </th>
                <td>
                  <input type="radio" id="member_type" checked={true} />
                  <label htmlFor="member_type">개인회원</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>기본정보</h3>
        <p className="signup-form__required">
          <img src={ico_required_blue} alt="필수" />
          {" 필수입력사항"}
        </p>
        <div>
          <table>
            <colgroup>
              <col style={{ width: "150px" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <tbody>
              {props
                .renderElements()
                .map((formElement: { id: string; config: IFields }) => {
                  return (
                    <tr key={formElement.id}>
                      <th>
                        {`${formElement.config.elementLabel} `}
                        {formElement.config.required && (
                          <img src={ico_required_blue} alt="필수" />
                        )}
                      </th>
                      <td>
                        {formElement.config.getComponent(
                          formElement,
                          props.onChange,
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <h3>
          <strong>전체 동의</strong>
        </h3>
        <div className="signup-form__agree-all">
          <p>
            <span>
              <input
                type="checkbox"
                id="agree_all_check"
                checked={agreeAllState}
                onChange={handleAgreeAll}
              ></input>
              <em></em>
            </span>
            <label htmlFor="agree_all_check">
              <strong>
                이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두
                동의합니다.
              </strong>
            </label>
          </p>
        </div>
        {signUpTermsField.map((field, index) => {
          return (
            <Terms
              key={index}
              index={index}
              head={field.head}
              content={field.content}
              tail={field.tail}
              checkBoxState={checkBoxState}
              setCheckBoxState={setCheckBoxState}
              agreeAllState={agreeAllState}
              setAgreeAllState={setAgreeAllState}
            />
          );
        })}
        <div className="signup-form__clearfix"></div>
        <div className="signup-form__btn">
          <a className="btn__submit" href="" onClick={handleSubmitClick}>
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}

export default withForm(signUpField)(SignUpForm);
