import * as React from "react";
import { useState } from "react";
import * as queryString from "query-string";

const useProductList = (category: string, search: string) => {
  const { page } = queryString.parse(search);

  const [itemColumnLength, setItemColumnLength] = useState<number>(4);

  const itemWidth = 80 / itemColumnLength;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const column = Number(e.currentTarget.dataset.column);

    setItemColumnLength(column);
  };

  return {
    category,
    page,
    itemColumnLength,
    itemWidth,
    handleClick,
  };
};

export default useProductList;
