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
                        <Link href={prevPageUrl} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                            Previous
                        </Link>
                    ) : (
                        <span className="px-4 py-2 border rounded-md text-gray-500 cursor-not-allowed">
                            Previous
                        </span>
                    )}
                </li>

                {/* Page numbers */}
                {pageNumbers.map((page) => (
                    <li key={page}>
                        {page === currentPage ? (
                            <span className="px-4 py-2 border rounded-md bg-blue-50 text-blue-600 font-medium">
                                {page}
                            </span>
                        ) : (
                            <Link
                                href={page === 1 ? baseUrl : `${baseUrl}?page=${page}`}
                                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                            >
                                {page}
                            </Link>
                        )}
                    </li>
                ))}

                {/* Next button */}
                <li>
                    {nextPageUrl ? (
                        <Link href={nextPageUrl} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                            Next
                        </Link>
                    ) : (
                        <span className="px-4 py-2 border rounded-md text-gray-500 cursor-not-allowed">
                            Next
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    );
}