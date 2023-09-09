// import { useState } from "react";

import "./pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
 
  const handlePrevPage = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <div className="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handlePrevPage}>
              prev
            </button>
          </li>
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handleNextPage}>
              next
            </button>
          </li>
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handleLastPage}>
              {totalPages}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
