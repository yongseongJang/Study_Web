import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/types";
import logo from "../../public/img/UniformBridge_logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.loginReducer.token);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header--static">
        <a href="/" className="header--static__logo">
          <img src={logo} alt="logo" />
        </a>
        <a href="" className="header--static__opener" onClick={handleClick}>
          <span
            className="opener__icon--open"
            style={{ visibility: !isMenuOpen ? "visible" : "hidden" }}
          >
            <span className="icon__line-wrapper">
              <span className="line-wrapper__line1"></span>
              <span className="line-wrapper__line2"></span>
              <span className="line-wrapper__line3"></span>
            </span>
          </span>
          <span
            className="opener__icon--close"
            style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
          >
            <span className="icon__line-wrapper">
              <span className="line-wrapper__line1"></span>
              <span className="line-wrapper__line2"></span>
            </span>
          </span>
        </a>
        <div className="header--static__widget">
          <div className="material-icons">
            <a href={token ? "/" : "/member/login"}>
              <span className="material-icons-outlined">person</span>
            </a>
          </div>
          <div className="material-icons">
            <a href="/order/cart">
              <span className="material-icons-outlined">shopping_bag</span>
            </a>
          </div>
          <div className="material-icons">
            <a href="javascript:;" style={{ cursor: "default" }}>
              <span className="material-icons-outlined">search</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="header--dynamic"
        style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
      >
        <nav className="header--dynamic__navigation">
          <ul>
            <li>
              <a href="/products/all_product">
                <span>ALL PRODUCT</span>
              </a>
            </li>
            <li>
              <a href="/products/uniform_bridge">
                <span>UNIFORM BRIDGE</span>
              </a>
            </li>
            <li>
              <a href="/products/brand">
                <span>BRAND</span>
              </a>
            </li>
            <div className="navigation__shortSpacer"></div>
            <div className="navigation__boardMenu">
              <ul>
                <li>
                  <a href="javascript:;">NOTICE</a>
                </li>
                <li>
                  <a href="javascript:;">REVIEW</a>
                </li>
                <li>
                  <a href="javascript:;">{`Q&A`}</a>
                </li>
              </ul>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
