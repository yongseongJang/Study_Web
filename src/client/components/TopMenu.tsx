import * as React from "react";

function TopMenu() {
  return (
    <section className="top-menu">
      <ul>
        <li>
          <a href="/member/login">Login</a>
        </li>
        <li>
          <a href="/member/join">Join</a>
        </li>
        <li>
          <a href="/">Order</a>
        </li>
        <li>
          <a href="/">{`Q&A`}</a>
        </li>
      </ul>
    </section>
  );
}

export default TopMenu;
