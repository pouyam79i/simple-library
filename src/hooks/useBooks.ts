import { BookListData } from '@/types/book-list-data';
import { useFetch } from './useFetch';

/**
 * This hooks fetches list of books from a given url
 * @param url api address to get data
 * @returns books data and fetch status
 */
export const useBooks = (url: string) => {
  const { data, loading, error } = useFetch<BookListData>(url);

  return {
    data: data || {
      bookList: {
        books: [],
      },
    },
    isLoading: loading,
    isError: !!error,
    error,
  };
};
