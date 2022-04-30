import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { loginActions, cartActions, orderActions } from "../actions";
import { loginSelectors } from "../selectors";

function TopMenu() {
  const dispatch = useDispatch();

  const [cookies, setCookies, removeCookies] = useCookies();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    removeCookies("uniformbridge_token");

    dispatch(loginActions.logout());

    dispatch(cartActions.removeAll(""));

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
