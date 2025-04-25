import { BookList } from '@/components/BookList';
import { useBooks } from '@/hooks/useBooks';
import { Box } from '@chakra-ui/react';

const BASE_URL = 'https://get.taaghche.com/v2/everything';
const INITIAL_PARAMS = {
  filters: {
    list: [
      { type: 21, value: 0 },
      { type: 6, value: -150000 },
    ],
  },
  order: 1,
};

export default function Home() {
  const { books, isLoading, isError } = useBooks(BASE_URL, INITIAL_PARAMS);

  return (
    <Box>
      <BookList books={books} isLoading={isLoading} isError={isError} />
    </Box>
  );
}
