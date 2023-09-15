import { useSearchParams } from "react-router-dom";

import "./pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFirstPage = () => {
    if (searchParams.has("page")) {
      setCurrentPage(0);
      setSearchParams({ page: 0 });
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setSearchParams({ page: currentPage - 1 });
  };

  const handleNextPage = () => {
    if (currentPage === totalPages - 1) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setSearchParams({ page: currentPage + 1 });
  };

  const handleLastPage = () => {
    if (searchParams.has("page")) {
      setCurrentPage(totalPages - 1);
      setSearchParams({ page: totalPages - 1 });
    }
  };

  return (
    <>
      <div className="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handleFirstPage}>
              Первая
            </button>
          </li>
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handlePrevPage}>
              &larr;
            </button>
          </li>
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handleNextPage}>
              &rarr;
            </button>
          </li>
          <li className="pagination__item">
            <button className="pagination__btn" onClick={handleLastPage}>
              Последняя
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Pagination;
