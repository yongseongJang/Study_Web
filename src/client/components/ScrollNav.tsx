import * as React from "react";
import "../styles/ScrollNav.scss";

interface ScrollNavProps {
  browserHeight: number;
}

function ScrollNav(props: ScrollNavProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    window.scrollTo({
      top:
        props.browserHeight *
        Number(e.currentTarget.getAttribute("data-index")),
      behavior: "smooth",
    });
  };

  return (
    <header className="scrollNav">
      <ul>
        <li>
          <a href="" data-index={0} onClick={handleClick}>
            section1
          </a>
        </li>
        <li>
          <a href="" data-index={1} onClick={handleClick}>
            section2
          </a>
        </li>
        <li>
          <a href="" data-index={2} onClick={handleClick}>
            section3
          </a>
        </li>
        <li>
          <a href="" data-index={3} onClick={handleClick}>
            section4
          </a>
        </li>
      </ul>
    </header>
  );
}

export default ScrollNav;
