
import React from "react";
import './Style.css';

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    paginate(currentPage - 1);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    paginate(currentPage + 1);
  };
  return (
    <nav className="pagination">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        prev
      </button>
      {pageNumbers.map((number,index) => (
        <button key={index} onClick={() => paginate(number)}>{number}</button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === pageNumbers.length}
      >
        next
      </button>
    </nav>
  );
};

export default Pagination;
