import React from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const btnBase =
  'h-8 min-w-8 px-3 inline-flex items-center justify-center rounded-control text-[13px] font-medium transition-colors focus-ring';
const btnIdle = 'bg-white border border-border-dark text-text-secondary hover:bg-gray-50';
const btnDisabled = 'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white';

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  if (totalItems === 0) return null;

  const pageCount = Math.max(totalPages, 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (pageCount <= maxVisible + 2) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < pageCount - 2) pages.push('...');
    pages.push(pageCount);
    return pages;
  };

  return (
    // mt-auto pins the footer to the bottom of the page card
    <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-border bg-white">
      <span className="text-[13px] text-text-muted">
        Showing {startItem}-{endItem} of {totalItems} entries
      </span>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${btnIdle} ${btnDisabled}`}
          aria-label="Previous page"
        >
          Prev
        </button>

        {getPageNumbers().map((page, idx) =>
          typeof page === 'string' ? (
            <span key={`ellipsis-${idx}`} className="px-1.5 text-text-muted text-[13px]">
              {page}
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`${btnBase} ${
                page === currentPage ? 'bg-primary text-white border border-primary' : btnIdle
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= pageCount}
          className={`${btnBase} ${btnIdle} ${btnDisabled}`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};
