import * as React from "react";
import { IPagination } from "../interfaces";
interface PaginationProps {
  pagination: IPagination;
  category: string;
}
function Pagination(props: PaginationProps) {
  const pages =
    props.pagination.endPage && props.pagination.startPage
      ? Array(props.pagination.endPage - props.pagination.startPage + 1)
          .fill(null)
          .map((v, i) => props.pagination.startPage + i)
      : null;

  return (
    <div className="pagination">
      <ol>
        <li>
          <a
            href={`/products/${props.category}?page=${props.pagination.startPage}`}
            data-page={props.pagination.startPage}
          >
            {"<"}
          </a>
        </li>
        {pages
          ? pages.map((page, index) => {
              return (
                <li key={index}>
                  <a
                    href={`/products/${props.category}?page=${page}`}
                    data-page={page}
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
          <a
            href={`/products/${props.category}?page=${props.pagination.endPage}`}
            data-page={props.pagination.endPage}
          >
            {">"}
          </a>
        </li>
      </ol>
    </div>
  );
}

export default Pagination;
