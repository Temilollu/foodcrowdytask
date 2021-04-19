import React from "react";
import "./pagination.css";

type PaginationProps = {
  transPerPage: number;
  totalTrans: number;
  paginationHandler: (num: number) => void;
  currentPage: number;
};

const Pagination = (props: PaginationProps) => {
  const { transPerPage, totalTrans, paginationHandler, currentPage } = props;
  let PageNumbers: any[] = [];

  for (let index = 1; index <= Math.ceil(totalTrans / transPerPage); index++) {
    PageNumbers.push(index);
  }

  return (
    <nav>
      <div className="pagination">
        {PageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginationHandler(number)}
            className={currentPage === number ? `active` : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
