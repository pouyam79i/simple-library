export type Author = {
  firstName: string;
  lastName: string;
};

/**
 * Book data
 */
export type Book = {
  id: number;
  title: string;
  authors: Author[];
  price: number;
  rating: number;
  coverUri: string;
};
