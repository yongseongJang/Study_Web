import * as React from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { orderActions } from "../reducers/orderReducer";
import { cartActions } from "../reducers/cartReducer";
import { loginActions } from "../reducers/loginReducer";

function TopMenu() {
  const dispatch = useDispatch();

  const [cookies, setCookies, removeCookies] = useCookies([
    "uniformbridge_token",
  ]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    removeCookies("uniformbridge_token");

    dispatch(loginActions.logout());

    dispatch(cartActions.removeAll({ token: "" }));

    dispatch(orderActions.reset());
  };
  return (
    <section className="top-menu">
      <ul>
        {cookies.uniformbridge_token ? (
          <li>
            <a href="/" onClick={handleClick}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <a href="/member/login">Login</a>
            </li>
            <li>
              <a href="/member/join">Join</a>
            </li>
          </>
        )}
        <li>
          <a href="/order/list">Order</a>
        </li>
        <li>
          <a href="javascript:;" style={{ cursor: "default" }}>{`Q&A`}</a>
        </li>
      </ul>
    </section>
  );
}

export default TopMenu;
