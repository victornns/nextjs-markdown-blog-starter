import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    if (totalPages <= 1) return null;

    const prevPageUrl = currentPage > 1
        ? baseUrl + (currentPage === 2 ? '' : `?page=${currentPage - 1}`)
        : null;

    const nextPageUrl = currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}`
        : null;

    // Create an array of page numbers to display
    const pageNumbers = [];
    const maxPageDisplay = 5; // Show at most 5 page numbers

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPageDisplay) {
        startPage = Math.max(1, endPage - maxPageDisplay + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Pagination" className="flex justify-center mt-10">
            <ul className="flex items-center space-x-1">
                {/* Previous button */}
                <li>
                    {prevPageUrl ? (
                        <Link href={prevPageUrl} className="px-3 py-2 border border-neutral-200 text-sm hover:bg-primary-50 text-neutral-800 hover:text-primary-700 transition-colors">
                            Previous
                        </Link>
                    ) : (
                        <span className="px-3 py-2 border border-neutral-200 text-sm text-neutral-600 cursor-not-allowed bg-neutral-50">
                            Previous
                        </span>
                    )}
                </li>

                {/* Page numbers */}
                {pageNumbers.map((page) => (
                    <li key={page}>
                        {page === currentPage ? (
                            <span className="px-3 py-2 border-b-2 border-primary-700 bg-primary-50 text-primary-800 font-medium text-sm">
                                {page}
                            </span>
                        ) : (
                            <Link
                                href={page === 1 ? baseUrl : `${baseUrl}?page=${page}`}
                                className="px-3 py-2 border border-neutral-200 text-sm hover:bg-primary-50 text-neutral-800 hover:text-primary-700 transition-colors"
                            >
                                {page}
                            </Link>
                        )}
                    </li>
                ))}

                {/* Next button */}
                <li>
                    {nextPageUrl ? (
                        <Link href={nextPageUrl} className="px-3 py-2 border border-neutral-200 text-sm hover:bg-primary-50 text-neutral-800 hover:text-primary-700 transition-colors">
                            Next
                        </Link>
                    ) : (
                        <span className="px-3 py-2 border border-neutral-200 text-sm text-neutral-600 cursor-not-allowed bg-neutral-50">
                            Next
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    );
}