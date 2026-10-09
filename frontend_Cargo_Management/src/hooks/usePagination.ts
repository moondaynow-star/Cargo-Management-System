import { useState, useMemo, useCallback } from 'react';
import { ITEMS_PER_PAGE } from '@/utils/constants';

/**
 * Client-side pagination for an already-filtered list.
 * The page is clamped, so deleting the last row of a page never leaves an empty page.
 */
export function usePagination<T>(items: T[], perPage: number = ITEMS_PER_PAGE) {
  const [page, setPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, currentPage, perPage]);

  const resetPage = useCallback(() => setPage(1), []);

  return { page: currentPage, setPage, resetPage, pageItems, totalItems, totalPages, perPage };
}
