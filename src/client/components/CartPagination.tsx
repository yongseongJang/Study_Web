import * as React from "react";
import { IPagination } from "../interfaces";

interface CartPaginationProps {
  pagination: IPagination;
  onClick: (e: React.MouseEvent) => void;
}

function CartPagination(props: CartPaginationProps) {
  const pages =
    props.pagination.endPage && props.pagination.startPage
      ? Array(props.pagination.endPage - props.pagination.startPage + 1)
          .fill(null)
          .map((v, i) => props.pagination.startPage + i)
      : null;

  return (
    <div className="cartPagination">
      <ol>
        <li>
          <a
            href=""
            data-page={props.pagination.startPage}
            className="startPage"
            onClick={props.onClick}
          >
            {"<"}
          </a>
        </li>
        {pages
          ? pages.map((page, index) => {
              return (
                <li key={index}>
                  <a
                    href=""
                    data-page={page}
                    className={
                      props.pagination.currentPage == page
                        ? "currentPage"
                        : "page"
                    }
                    onClick={props.onClick}
                  >
                    {page}
                  </a>
                </li>
              );
            })
          : null}
        <li>
          <a
            href=""
            data-page={props.pagination.endPage}
            className="endPage"
            onClick={props.onClick}
          >
            {">"}
          </a>
        </li>
      </ol>
    </div>
  );
}

export default CartPagination;
