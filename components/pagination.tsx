import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  category?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  query = '',
  category = '',
}: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    if (page > 1) params.set('page', page.toString());
    return `/?${params.toString()}`;
  };
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => 
      page === 1 || 
      page === totalPages || 
      (page >= currentPage - 1 && page <= currentPage + 1)
  );
  
  const pagesWithEllipsis = [];
  let prevPage = 0;
  
  for (const page of pages) {
    if (prevPage && page > prevPage + 1) {
      pagesWithEllipsis.push('...');
    }
    pagesWithEllipsis.push(page);
    prevPage = page;
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={getPageUrl(currentPage - 1)} aria-label="前のページ">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>
      
      {pagesWithEllipsis.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              {page}
            </span>
          );
        }
        
        return (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? (
              <Link href={getPageUrl(page as number)}>
                {page}
              </Link>
            ) : (
              <span>{page}</span>
            )}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={getPageUrl(currentPage + 1)} aria-label="次のページ">
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </div>
  );
}