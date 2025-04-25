import { BookListData } from '@/types/book-list-data';

/**
 * Handle initial loads for book data
 * @returns first load for list of books data
 */
export const fetchInitialBooks = async (): Promise<BookListData> => {
  const response = await fetch(
    'https://get.taaghche.com/v2/everything?filters={%22list%22:[{%22type%22:21,%22value%22:0},{%22type%22:6,%22value%22:-150000},{%22type%22:50,%22value%22:0}]}&offset=0-0-0-16&order=1',
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
