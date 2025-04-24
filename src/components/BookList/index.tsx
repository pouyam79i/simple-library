import { Book } from '@/types/book';
import { SimpleGrid, Skeleton, Alert } from '@chakra-ui/react';
import { BookCard } from '../BookCard';

type BookListProps = {
  books: Book[];
  isLoading: boolean;
  isError: boolean;
};

export const BookList = ({ books, isLoading, isError }: BookListProps) => {
  if (isError) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>Failed to load books</Alert.Title>
      </Alert.Root>
    );
  }

  return (
    // TODO: refactor and unify styles for skeleton and card
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 7 }}>
      {isLoading
        ? Array(16)
            .fill(0)
            .map((_, i) => <Skeleton margin={4} key={i} height="400px" borderRadius="md" />)
        : books?.map((book) => <BookCard key={book.id} book={book} />)}
    </SimpleGrid>
  );
};
