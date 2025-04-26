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
const BASE_URL = 'https://get.taaghche.com/v2/everything';
/**
 * INITIAL PARAMS
 * TODO: better way to implement app property
 */
const INITIAL_PARAMS = {
  filters: {
    list: [
      { type: 21, value: 0 },
      { type: 17, value: 1 },
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
  const { books, isLoading, isError, hasMore, loadMore, updateParams, refresh } = useBooks(
    BASE_URL,
    INITIAL_PARAMS,
    initialData,
  );

  // TODO: move this function to a util ts file
  const handleSearch = (query: string) => {
    updateParams({
      search: query,
      offset: '0-0-0-16',
    });
  };

  // TODO: move this function to a util ts file
  const handleSort = (sortBy: string) => {
    // TODO: handle sorts
    if (sortBy)
      updateParams({
        order: sortBy,
        offset: '0-0-0-16',
      });
    else refresh();
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
