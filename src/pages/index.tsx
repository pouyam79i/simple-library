import { BookList } from '@/components/BookList';
import { useBooks } from '@/hooks/useBooks';
import { Box } from '@chakra-ui/react';

/**
 * Base URL
 * TODO: better way to implement app property
 */
const BASE_URL = 'https://get.taaghche.com/v2/everything';
/**
 * INITIAL PARAMS
 * TODO: better way to implement app property
 */
const INITIAL_PARAMS = {
  filters: {
    list: [
      { type: 21, value: 0 },
      { type: 6, value: -150000 },
    ],
  },
  order: 1,
};

/**
 * Renders home page
 */
export default function Home() {
  const { books, isLoading, isError, hasMore, loadMore } = useBooks(BASE_URL, INITIAL_PARAMS);

  return (
    <Box>
      <BookList
        books={books}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </Box>
  );
}
