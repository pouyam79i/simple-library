import { BookList } from '@/components/BookList';
import { useBooks } from '@/hooks/useBooks';
import { Box } from '@chakra-ui/react';

export default function Home() {
  const { data, isLoading, isError } = useBooks(
    'https://get.taaghche.com/v2/everything?filters=%7B%22list%22:[%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-150000%7D,%7B%22type%22:50,%22value%22:0%7D]%7D&offset=0-0-0-16&order=1',
  );

  return (
    <Box>
      <BookList books={data.bookList.books} isLoading={isLoading} isError={isError} />
    </Box>
  );
}
