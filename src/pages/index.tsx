import { BookList } from '@/components/BookList';
import { Navbar } from '@/components/Navbar';
import { useBooks } from '@/hooks/useBooks';
import { BookListData } from '@/types/book-list-data';
import { fetchInitialBooks } from '@/utils/api';
import { Alert, Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

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

// TODO: handle error of initial load
/**
 * Home page properties
 */
interface HomeProps {
  initialData?: BookListData;
  error?: string;
}

/**
 * Renders home page
 */
export default function Home({ initialData, error }: HomeProps) {
  const { books, isLoading, isError, hasMore, loadMore, updateParams } = useBooks(
    BASE_URL,
    INITIAL_PARAMS,
    initialData,
  );

  const handleSearch = (query: string) => {
    updateParams({
      search: query,
      offset: '0-0-0-16',
    });
  };

  const handleSort = (sortBy: string) => {
    updateParams({
      order: sortBy,
      offset: '0-0-0-16',
    });
  };

  return (
    <Box>
      {error && <Alert.Root>{error}</Alert.Root>}
      <Navbar onSearch={handleSearch} onSort={handleSort} initialSearch={''} initialSort={'0'} />
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

/**
 * Handles first fetch when SSR
 */
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const initialData = await fetchInitialBooks();
    return {
      props: { initialData },
    };
  } catch (error) {
    return {
      props: {
        error: error instanceof Error ? error.message : 'Failed to load books',
      },
    };
  }
};
