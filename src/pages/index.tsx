import { BookList } from '@/components/BookList';
import { Navbar } from '@/components/Navbar';
import { useBooks } from '@/hooks/useBooks';
import { BookListData } from '@/types/book-list-data';
import { fetchInitialBooks } from '@/utils/api';
import { Box, Spinner, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

/**
 * Base URL
 * TODO: better way to implement app property
 */
const BASE_URL =
  'https://get.taaghche.com/v2/everything?filters=%7B%22list%22:[%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-150000%7D,%7B%22type%22:50,%22value%22:0%7D]%7D&order=1';
/**
 * INITIAL PARAMS
 * TODO: better way to implement app property
 */
const INITIAL_PARAMS = {
  // order: 1,
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
export default function Home({ initialData }: HomeProps) {
  const { books, isLoading, isError, hasMore, loadMore } = useBooks(
    BASE_URL,
    INITIAL_PARAMS,
    initialData,
  );

  // TODO: move this function to a util ts file
  const handleSearch = (query: string) => {};

  // TODO: move this function to a util ts file
  const handleSort = (sortBy: string) => {
    // TODO: handle sorts
  };

  return (
    <Box>
      <Box
        position={'fixed'}
        top={0}
        zIndex={10}
        width={'100%'}
        backgroundColor={'bg'}
        borderBottomWidth={'1px'}
      >
        <Navbar onSearch={handleSearch} onSort={handleSort} initialSearch={''} initialSort={'0'} />
      </Box>
      <Box marginTop={'100px'}>
        {isLoading && books?.length > 0 && (
          <VStack width="100%" position="fixed" top="100px" zIndex={10} colorPalette="teal">
            <Spinner color="colorPalette.600" size="xl" />
          </VStack>
        )}
        {/* TODO: handle ssr related error in a proper manner */}
        {/* {error && <Alert.Root>{error}</Alert.Root>} */}
        <BookList
          books={books}
          isLoading={isLoading}
          isError={isError}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </Box>
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
