import * as React from "react";
import { SignUpForm } from "../containers";
import { TopMenu } from "../components";

function SignUp() {
  return (
    <div className="signup">
      <div className="signup__page-outer">
        <div className="page-outer__page-inner">
          <TopMenu />
          <main className="page-inner__contents">
            <div className="contents__section-wrap">
              <div className="section-wrap__title">
                <h2>회원 가입</h2>
              </div>
              <section className="section-wrap__main">
                <div>
                  <SignUpForm></SignUpForm>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
