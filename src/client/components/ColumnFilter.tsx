import * as React from "react";

interface ColumnFilter {
  column: number;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function ColumnFilter(props: ColumnFilter) {
  return (
    <div className="column-filter">
      <a
        href=""
        className={props.column === 3 ? "active" : ""}
        data-column={3}
        onClick={props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22.5"
          height="14.3418"
          viewBox="0 0 22.5 14.3418"
        >
          <circle cx="2.5" cy="2.5" r="2.5"></circle>
          <circle cx="2.665" cy="11.8418" r="2.5"></circle>
          <circle cx="11" cy="2.5" r="2.5"></circle>
          <circle cx="11" cy="11.767" r="2.5"></circle>
          <circle cx="20" cy="2.5" r="2.5"></circle>
          <circle cx="20" cy="11.767" r="2.5"></circle>
        </svg>
      </a>
      <a
        href=""
        className={props.column === 4 ? "active" : ""}
        data-column={4}
        onClick={props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="14.3418"
          viewBox="0 0 31 14.3418"
        >
          <circle cx="2.5" cy="2.5" r="2.5"></circle>
          <circle cx="2.5" cy="11.767" r="2.5"></circle>
          <circle cx="11" cy="2.5" r="2.5"></circle>
          <circle cx="11.165" cy="11.8418" r="2.5"></circle>
          <circle cx="19.5" cy="2.5" r="2.5"></circle>
          <circle cx="19.5" cy="11.767" r="2.5"></circle>
          <circle cx="28.5" cy="2.5" r="2.5"></circle>
          <circle cx="28.5" cy="11.767" r="2.5"></circle>
        </svg>
      </a>
      <a
        href=""
        className={props.column === 6 ? "active" : ""}
        data-column={6}
        onClick={props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="14.3418"
          viewBox="0 0 48 14.3418"
        >
          <circle cx="2.5" cy="2.5749" r="2.5"></circle>
          <circle cx="2.5" cy="11.8418" r="2.5"></circle>
          <circle cx="10.835" cy="2.5" r="2.5"></circle>
          <circle cx="10.835" cy="11.767" r="2.5"></circle>
          <circle cx="19.5" cy="2.5" r="2.5"></circle>
          <circle cx="19.5" cy="11.767" r="2.5"></circle>
          <circle cx="28" cy="2.5" r="2.5"></circle>
          <circle cx="28.165" cy="11.8418" r="2.5"></circle>
          <circle cx="36.5" cy="2.5" r="2.5"></circle>
          <circle cx="36.5" cy="11.767" r="2.5"></circle>
          <circle cx="45.5" cy="2.5" r="2.5"></circle>
          <circle cx="45.5" cy="11.767" r="2.5"></circle>
        </svg>
      </a>
    </div>
  );
}

export default ColumnFilter;
