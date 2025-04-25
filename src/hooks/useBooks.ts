import { useCallback, useEffect, useState } from 'react';
import { BookListData } from '@/types/book-list-data';
import { useFetch } from './useFetch';
import { Book } from '@/types/book';

/**
 * This hooks fetches list of books from a given url
 * @param baseUrl base api address to get list of books
 * @returns books data and fetch status
 */
export const useBooks = (baseUrl: string, initialParams = {}) => {
  const [params, setParams] = useState({
    ...initialParams,
    offset: '0-0-0-16',
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(true);

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
    if (data?.bookList?.books) {
      setBooks((prev) => [...prev, ...data.bookList.books]);
      setHasMore(data.hasMore);
    }
  }, [data]);

  useEffect(() => {
    setBooks([]);
    setParams({
      ...initialParams,
      offset: '0-0-0-16',
    });
    setHasMore(true);
  }, [baseUrl, initialParams]);

  return {
    books,
    isLoading: loading,
    isError: !!error,
    error,
    hasMore,
    loadMore,
    updateParams: useCallback((newParams: Partial<typeof params>) => {
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
