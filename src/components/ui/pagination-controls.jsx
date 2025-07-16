"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;

  if (totalPages > 0) {
    pageNumbers.push(1);
  }

  let startPage = Math.max(
    2,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = Math.min(
    totalPages - 1,
    currentPage + Math.floor(maxPageNumbersToShow / 2)
  );

  if (currentPage <= Math.ceil(maxPageNumbersToShow / 2) + 1) {
    endPage = Math.min(totalPages - 1, maxPageNumbersToShow + 1);
  }
  if (currentPage >= totalPages - Math.floor(maxPageNumbersToShow / 2)) {
    startPage = Math.max(2, totalPages - maxPageNumbersToShow);
  }

  if (startPage > 2) {
    pageNumbers.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push("...");
  }

  if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
    pageNumbers.push(totalPages);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            {...(currentPage === 1 ? {} : { href: "#" })}
          />
        </PaginationItem>
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            {...(currentPage === totalPages || totalPages === 0
              ? {}
              : { href: "#" })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
