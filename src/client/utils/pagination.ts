import { IPagination } from "../interfaces";

export const paginate = (
  totalItemCount: number,
  currentPage = 1,
  pageItemCount = 4,
  pageInterval = 3,
): IPagination => {
  const totalPage = Math.ceil(totalItemCount / pageItemCount);

  let startPage, endPage;
  if (totalPage < pageInterval) {
    startPage = 1;
    endPage = totalPage;
  } else {
    const pageCountBeforeCurrentPage = Math.floor(pageInterval / 2);
    const pageCountAfterCurrentPage = Math.ceil(pageInterval / 2) - 1;
    if (currentPage <= pageCountBeforeCurrentPage) {
      startPage = 1;
      endPage = pageInterval;
    } else if (currentPage + pageCountAfterCurrentPage >= totalPage) {
      startPage = totalPage - pageInterval + 1;
      endPage = totalPage;
    } else {
      startPage = currentPage - pageCountBeforeCurrentPage;
      endPage = currentPage + pageCountAfterCurrentPage;
    }
  }

  const startIndex = (currentPage - 1) * pageItemCount;
  const endIndex = Math.min(startIndex + pageItemCount - 1, totalItemCount - 1);

  return {
    totalPage,
    startPage,
    endPage,
    currentPage,
    startIndex,
    endIndex,
  };
};
