import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginActions, cartActions } from "../actions";
import { RootState } from "../reducers/types";

function TopMenu() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.loginReducer.token);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(loginActions.logout());

    dispatch(cartActions.removeAll(""));
  };
  return (
    <section className="top-menu">
      <ul>
        {token ? (
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
          <a href="javascript:;" style={{ cursor: "default" }}>
            Order
          </a>
        </li>
        <li>
          <a href="javascript:;" style={{ cursor: "default" }}>{`Q&A`}</a>
        </li>
      </ul>
    </section>
  );
}

export default TopMenu;
