import { Author, Book } from '@/types/book';
import { Card, Heading, Text, Image, RatingGroup, VStack, LocaleProvider } from '@chakra-ui/react';

/**
 * Required data for a book card
 */
type BookCardProps = {
  book: Book;
};

const generateAuthorsName = (authors: Author[]): string => {
  let str = '';
  authors.forEach((item, index) => {
    str += item.firstName + ' ' + item.lastName;
    if (index + 1 < authors.length) str += ' و ';
  });
  return str;
};

/**
 * This is a functional component to display book data
 * @param BookCardProps book data
 */
export const BookCard = ({ book }: BookCardProps) => (
  <Card.Root
    variant="outline"
    _hover={{ transform: 'scale(1.02)' }}
    transition="transform 0.2s"
    height="440px"
    margin={4}
  >
    <Card.Header>
      {/* TODO: handle text overflow */}
      <Heading size="md" overflow={'hidden'} height={'24px'} textOverflow={'ellipsis'}>
        {book.title}
      </Heading>
    </Card.Header>
    <Card.Body>
      <VStack align={'start'}>
        {/* TODO: reduce code duplication */}
        {book.coverUri ? (
          <Image
            src={book.coverUri}
            alt={`${book.title} cover`}
            objectFit="cover"
            height="200px"
            width="100%"
            borderRadius="md"
          />
        ) : (
          <Image
            src="/empty-cover.webp"
            alt="empty"
            objectFit="cover"
            height="200px"
            width="100%"
            borderRadius="md"
          />
        )}
        {/* TODO: handle text overflow */}
        {book?.authors?.length > 0 && (
          <Heading color={'gray.400'} size="xs">
            نویسندگان
          </Heading>
        )}
        <Text
          color={'gray.500'}
          height="24px"
          maxWidth="200px"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {generateAuthorsName(book.authors)}
        </Text>
      </VStack>
    </Card.Body>
    <LocaleProvider locale="en-US">
      <Card.Footer dir="ltr">
        <VStack align={'start'}>
          <Text fontSize="sm" color="gray.500" mt={1}>
            ریال {book.price}
          </Text>
          <RatingGroup.Root count={5} value={book.rating} size="sm">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </VStack>
      </Card.Footer>
    </LocaleProvider>
  </Card.Root>
);
