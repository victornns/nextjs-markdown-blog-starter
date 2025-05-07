export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
    return (
        <div className="pagination">
            <button disabled={currentPage === 1}>Previous</button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}