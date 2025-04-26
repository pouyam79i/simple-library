import { useCallback, useEffect, useState } from 'react';
import { BookListData } from '@/types/book-list-data';
import { useFetch } from './useFetch';
import { Book } from '@/types/book';

// TODO: critical issue with performance on fetching data

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

  // TODO: make it so it won't call it many one more time on initialization
  const { data, loading, error, refetch } = useFetch<BookListData>(baseUrl, params);

  const loadMore = useCallback(() => {
    if (!loading && data?.hasMore) {
      setParams((prev) => ({
        ...prev,
        offset: data.nextOffset,
      }));
    }
  }, [data?.hasMore, data?.nextOffset, loading]);

  useEffect(() => {
    if (data?.bookList?.books) setBooks((prev) => [...prev, ...data.bookList.books]);
  }, [data?.bookList.books]);

  useEffect(() => {
    setHasMore(data?.hasMore || false);
  }, [data?.hasMore]);

  // initial load
  useEffect(() => {
    if (initialData) {
      setBooks(initialData.bookList.books);
      setParams({
        ...initialParams,
        offset: initialData.nextOffset,
      });
      setHasMore(initialData.hasMore);
    } else {
      setBooks([]);
      setParams({
        ...initialParams,
        offset: '0-0-0-16',
      });
      setHasMore(true);
    }
  }, [baseUrl, initialParams, initialData]);

  return {
    books,
    isLoading: loading,
    isError: !!error,
    error,
    hasMore,
    loadMore,
    updateParams: useCallback((newParams: Record<string, any>) => {
      setParams((prev) => ({
        ...prev,
        ...newParams,
        offset: '0-0-0-16',
      }));
    }, []),
    refresh: useCallback(() => {
      setBooks([]);
      setHasMore(true);
      refetch();
    }, [refetch]),
  };
};
