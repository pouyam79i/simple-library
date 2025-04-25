import { SimpleGrid, Skeleton, Alert, Spinner, VStack } from '@chakra-ui/react';
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
    <>
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
          : books?.map((book) => <BookCard key={book.id} book={book} />)}
      </SimpleGrid>
      {isLoading && books?.length > 0 && (
        <VStack width="100%" position="fixed" top="20px" colorPalette="teal">
          <Spinner color="colorPalette.600" size="xl" />
        </VStack>
      )}

      {/* TODO: issue with two request here */}
      <Sentinel onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />
    </>
  );
};
