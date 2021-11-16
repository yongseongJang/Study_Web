import * as React from "react";
import { HeaderSub, ImageBanner } from ".";
import * as logo from "../../public/img/UniformBridge_logo.png";
import headerSubCategory from "../utils/fields/headerSubCategory";

function Header() {
  return (
    <div className="Header">
      <div className="Header__Area">
        <div className="Header__Area__Nav">
          <div className="Header__Area__Nav__Logo">
            <a href="/">
              <img src="./img/UniformBridge_logo.png" alt="logo" />
            </a>
          </div>
          <nav className="Header__Area__Nav__Category">
            <div className="Header__Area__Nav__Category__Shop">
              <ul>
                <li>
                  <a href="">
                    <span>All product</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Brand</span>
                  </a>
                  <ImageBanner />
                  <HeaderSub categories={headerSubCategory.Brand} />
                </li>
                <li>
                  <a href="">
                    <span>Categories</span>
                  </a>
                  <ImageBanner />
                  <HeaderSub categories={headerSubCategory.Categories} />
                </li>
                <li>
                  <a href="">
                    <span>Sale</span>
                  </a>
                  <ImageBanner />
                  <HeaderSub categories={headerSubCategory.Sale} />
                </li>
              </ul>
              <ul className="Header__Area__Nav__Category__Shop__ETC">
                <li>
                  <a href="">
                    <span>LookBook</span>
                  </a>
                  <ImageBanner />
                  <HeaderSub categories={headerSubCategory.LookBook} />
                </li>
              </ul>
            </div>
          </nav>
          <div className="Header__Area__Nav__Right">
            <ul>
              <li>
                <span className="Header__Area__Nav__Right__Search">
                  Search{" "}
                  <div>
                    <form></form>
                  </div>
                </span>
              </li>
              <li>
                <a href="">
                  <span>Cart</span>
                </a>
              </li>
              <li>
                <a href="">Login</a>
              </li>
              <li>
                <a href="">Join</a>
              </li>
              <li>
                <a href="">{`Q&A`}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
