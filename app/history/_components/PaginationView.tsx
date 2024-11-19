'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '../../../components/ui/pagination';
import SelectLimitView from './SelectLimitView';
import { PaginationViewProps } from '@/entries/Entries';



const PaginationView = ({ currentPage: initialPage, pageSize, totalItems }: PaginationViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(pageSize);

  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  if (totalPages < 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`/history${query}`);
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setLimit(newLimit);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    params.set('limit', newLimit.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`/history${query}`);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const listOfPageNumbers = generatePageNumbers().map((page) => (
    <PaginationItem key={page}>
      <PaginationLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(page);
        }}
        isActive={page === currentPage}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  ))

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap md:flex-nowrap">
      <Pagination currentPage={currentPage} lastPage={totalPages}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage <= 1}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {listOfPageNumbers}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <SelectLimitView
        limit={limit}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default PaginationView; 
