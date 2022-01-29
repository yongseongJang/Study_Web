import * as React from "react";
import { IPagination } from "../interfaces";
interface PaginationProps {
  pagination: IPagination;
  requestPage: (page: number) => void;
}
function Pagination(props: PaginationProps) {
  const pages =
    props.pagination.endPage && props.pagination.startPage
      ? Array(props.pagination.endPage - props.pagination.startPage + 1)
          .fill(null)
          .map((v, i) => props.pagination.startPage + i)
      : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    props.requestPage(Number(e.currentTarget.getAttribute("data-page")));
  };

  return (
    <div className="pagination">
      <ol>
        <li>
          <a
            href=""
            data-page={props.pagination.startPage}
            onClick={handleClick}
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
                    onClick={handleClick}
                    className={
                      props.pagination.currentPage == page
                        ? "currentPage"
                        : "page"
                    }
                  >
                    {page}
                  </a>
                </li>
              );
            })
          : null}
        <li>
          <a href="" data-page={props.pagination.endPage} onClick={handleClick}>
            {">"}
          </a>
        </li>
      </ol>
    </div>
  );
}

export default Pagination;
