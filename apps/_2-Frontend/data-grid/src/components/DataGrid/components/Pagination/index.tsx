import type { ReactNode } from 'react';
import type { DataGridTableReference } from '../../types/shared.type';
import { cn } from '@repo/ui-shadcn';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

type DataGridPaginationProps<TData> = DataGridTableReference<TData>;

type PageButtonProps = {
  content: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
};

const PageButton = ({ content, onClick, disabled, active }: PageButtonProps) => {
  return (
    <button className={cn('datagrid-page-button', active && 'active', disabled && 'disabled')} onClick={onClick} disabled={!!disabled}>
      {content}
    </button>
  );
};

const DataGridPagination = <TData,>({ tableReference: table }: DataGridPaginationProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const windowSize = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= windowSize + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const half = Math.floor(windowSize / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 1) {
      start = 2;
      end = 1 + windowSize;
    }

    if (currentPage >= totalPages - half) {
      start = totalPages - windowSize;
      end = totalPages - 1;
    }

    pages.push(1);

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const canGoNext = table.getCanNextPage();
  const canGoPrev = table.getCanPreviousPage();

  return (
    <div className="datagrid-pagination">
      <PageButton content={<CaretLeftIcon />} disabled={!canGoPrev} onClick={() => table.previousPage()} />

      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <PageButton key={page} content={page} active={currentPage === page} onClick={() => table.setPageIndex(page - 1)} />
        ) : (
          <PageButton key={`ellipsis-${index}`} content="..." disabled />
        ),
      )}

      <PageButton content={<CaretRightIcon />} disabled={!canGoNext} onClick={() => table.nextPage()} />
    </div>
  );
};

export default DataGridPagination;


