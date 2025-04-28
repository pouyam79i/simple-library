import { useCallback, useEffect, useState } from 'react';
import { BookListData } from '@/types/book-list-data';
import { useFetch } from './useFetch';
import { Book } from '@/types/book';

/**
 * This hooks fetches list of books from a given url
 * @param baseUrl base api address to get list of books
 * @returns books data and fetch status
 */
export const useBooks = (
  baseUrl: string,
  initialParams: Record<string, any> = {},
  initialData: BookListData | null = null,
) => {
  const [params, setParams] = useState<Record<string, any>>({
    ...initialParams,
    offset: initialData?.nextOffset || '0-0-0-16',
  });
  const [books, setBooks] = useState<Book[]>(initialData?.bookList?.books || []);
  const [hasMore, setHasMore] = useState<boolean>(initialData?.hasMore || true);
  const { data, loading, error, triggerFetch } = useFetch<BookListData>(baseUrl, {
    params: params,
  });

  useEffect(() => {
    const newBooks = data?.bookList.books;
    if (!loading) if (newBooks) setBooks((prev) => [...prev, ...newBooks]);
  }, [data?.bookList.books, loading]);

  useEffect(() => {
    setHasMore(data?.hasMore ?? false);
  }, [data?.hasMore]);

  return {
    books,
    isLoading: loading,
    isError: !!error,
    error,
    hasMore,
    loadMore: () => {
      console.log('loading more');
      setParams((prev) => ({
        ...prev,
        offset: data?.nextOffset,
      }));
      triggerFetch();
    },
    updateParams: (newParams: Record<string, any>) => {
      console.log('updating params');
      setBooks([]);
      setParams((prev) => ({
        ...newParams,
        offset: '0-0-0-16',
      }));
      triggerFetch();
    },
  };
};
