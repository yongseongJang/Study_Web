import * as React from "react";

interface headerSubProps {
  categories: { [key: string]: string[] } | string[];
}

function HeaderSub(props: headerSubProps) {
  return (
    <ul className="HeaderSub">
      {Array.isArray(props.categories)
        ? props.categories.map((category) => {
            return (
              <li key={category}>
                <a href="">
                  <span>{`${category}`}</span>
                </a>
              </li>
            );
          })
        : Object.keys(props.categories).map((key) => {
            return (
              <li key={key}>
                <a>{key}</a>
                {props.categories[key].map((category) => {
                  return (
                    <li key={category}>
                      <a href="">
                        {`${category}`}
                        <span></span>
                      </a>
                    </li>
                  );
                })}
              </li>
            );
          })}
    </ul>
  );
}

export default HeaderSub;
