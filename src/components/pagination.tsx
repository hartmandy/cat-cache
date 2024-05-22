import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">
          Total: {totalItems} records
        </span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <button
        className={`text-gray-700 ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-gray-900"
        }`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className={`text-gray-700 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-gray-900"
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
