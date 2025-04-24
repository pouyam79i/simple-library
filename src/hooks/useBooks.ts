import { Book } from '@/types/book';
import { useFetch } from './useFetch';

/**
 * This hooks fetches list of books from a given url
 * @param url api address to get data
 * @returns books data and fetch status
 */
export const useBooks = (url: string) => {
  const { data, loading, error } = useFetch<Book[]>(url);

  return {
    books: data || [],
    isLoading: loading,
    isError: !!error,
    error,
  };
};
