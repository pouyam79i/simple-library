import { SimpleGrid, Skeleton, Alert, Box } from '@chakra-ui/react';
import { BookCard } from '../BookCard';
import { Book } from '@/types/book';
import { Sentinel } from '../Sentinel';

/**
 * Properties of BookList
 */
type BookListProps = {
  books: Book[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
};

/**
 * Renders list of books in a proper manner.
 * @param books array of books
 * @param isLoading loading status
 * @param isError indicated error if it cannot pass data
 * @param loadMore a callback called when reached to the end and there is more data!
 */
export const BookList = ({ books, isLoading, isError, hasMore, loadMore }: BookListProps) => {
  return (
    <Box>
      {/* TODO: show proper error message */}
      {isError && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>Failed to load books</Alert.Title>
        </Alert.Root>
      )}
      {/* TODO: refactor and unify styles for skeleton and card */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 7 }}>
        {isLoading && !(books?.length > 0)
          ? Array(16)
              .fill(0)
              .map((_, i) => <Skeleton margin={4} key={i} height="400px" borderRadius="md" />)
          : books?.map((book, index) => <BookCard key={index} book={book} />)}
      </SimpleGrid>

      {/* TODO: issue with two request here */}
      <Sentinel onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />
    </Box>
  );
};
