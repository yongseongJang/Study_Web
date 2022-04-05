import * as React from "react";
import { LoginForm, OrderHistoryLoginForm } from "../containers";
import { TopMenu } from "../components";

interface LoginProps {
  match: {
    url: string;
  };
}

function Login(props: LoginProps) {
  const isOrderLogin = props.match.url === "/order/login/";

  return (
    <div className="login">
      <div className="login__page-outer">
        <div className="page-outer__page-inner">
          <TopMenu />
          <main className="page-inner__contents">
            <div className="contents__section-wrap">
              <section className="section-wrap__spacer"></section>
              <section>
                <h2 className="section-wrap__title">Login</h2>
              </section>
              <section>
                <span>
                  <div className="section-wrap__separator1"></div>
                  <div className="section-wrap__separator2"></div>
                </span>
              </section>
              <section className="section-wrap__main">
                <div
                  className={isOrderLogin ? "main__order-login" : "main__login"}
                >
                  <LoginForm></LoginForm>
                  {/* <ul className="main__snsArea">
                    <p>SNS 로그인</p>
                    <li>
                      <a href=""></a>
                    </li>
                    <li>
                      <a href=""></a>
                    </li>
                  </ul> */}
                  {isOrderLogin && (
                    <OrderHistoryLoginForm></OrderHistoryLoginForm>
                  )}
                </div>
              </section>
              <section>
                <div className="section-wrap__separator1"></div>
                <div className="section-wrap__separator2"></div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
