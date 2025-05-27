import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Logic to show limited page numbers with ellipsis
    let pagesToShow = pages;
    if (totalPages > 7) {
        if (currentPage <= 3) {
            pagesToShow = [...pages.slice(0, 5), -1, totalPages];
        } else if (currentPage >= totalPages - 2) {
            pagesToShow = [1, -1, ...pages.slice(totalPages - 5)];
        } else {
            pagesToShow = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled={currentPage === 1} asChild={currentPage !== 1}>
                    {currentPage === 1 ? (
                        <span>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                        </span>
                    ) : (
                        <Link href={`?page=${currentPage - 1}`}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                        </Link>
                    )}
                </Button>

                {pagesToShow.map((page, i) =>
                    page === -1 ? (
                        <span key={`ellipsis-${i}`} className="px-2">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            className={currentPage === page ? 'bg-pink-600 hover:bg-pink-700' : ''}
                            asChild={currentPage !== page}
                        >
                            {currentPage === page ? <span>{page}</span> : <Link href={`?page=${page}`}>{page}</Link>}
                        </Button>
                    ),
                )}

                <Button variant="outline" size="icon" disabled={currentPage === totalPages} asChild={currentPage !== totalPages}>
                    {currentPage === totalPages ? (
                        <span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                        </span>
                    ) : (
                        <Link href={`?page=${currentPage + 1}`}>
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                        </Link>
                    )}
                </Button>
            </div>
        </div>
    );
}
