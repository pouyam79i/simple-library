import { Book } from './book';

/**
 * This is the data structure returned by application logicList
 */
export type BookListData = {
  bookList: {
    books: Book[];
  };
  hasMore: boolean;
  nextOffset: string;
};
