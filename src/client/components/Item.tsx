import * as React from "react";

function Item() {
  return (
    <article className="item">
      <div className="item__inner">
        <div className="inner__image">
          <a href="">
            <span className="image__sold-out"></span>
            <img src="" alt="" />
          </a>
        </div>
        <div className="inner_content">
          <a href="" className="content__title"></a>
          <ul className="content__element">
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default Item;
