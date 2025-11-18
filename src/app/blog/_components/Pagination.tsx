import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const MAX_PAGES_DISPLAY = 5;
const buttonStyles = "px-3 py-2 border border-neutral-200 text-sm hover:bg-primary-50 text-secondary hover:text-primary-700 transition-colors";
const disabledStyles = "px-3 py-2 border border-neutral-200 text-sm text-secondary cursor-not-allowed bg-neutral-50 inline-block";

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => (page === 1 ? baseUrl : `${baseUrl}?page=${page}`);
  const prevPageUrl = currentPage > 1 ? getPageUrl(currentPage - 1) : null;
  const nextPageUrl = currentPage < totalPages ? getPageUrl(currentPage + 1) : null;

  const endPage = Math.min(totalPages, Math.max(currentPage + 2, MAX_PAGES_DISPLAY));
  const startPage = Math.max(1, endPage - MAX_PAGES_DISPLAY + 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-16">
      <ul className="flex items-center space-x-1">
        <li>
          {prevPageUrl ? (
            <Link href={prevPageUrl} className={buttonStyles}>
              Previous
            </Link>
          ) : (
            <span className={disabledStyles}>Previous</span>
          )}
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className="px-3 py-2 border-b-2 border-primary-700 bg-primary-50 text-primary-800 font-medium text-sm">{page}</span>
            ) : (
              <Link href={getPageUrl(page)} className={buttonStyles}>
                {page}
              </Link>
            )}
          </li>
        ))}
        <li>
          {nextPageUrl ? (
            <Link href={nextPageUrl} className={buttonStyles}>
              Next
            </Link>
          ) : (
            <span className={disabledStyles}>Next</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
