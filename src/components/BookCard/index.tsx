import { Book } from '@/types/book';
import { Card, Heading, Text, Image } from '@chakra-ui/react';

/**
 * Required data for a book card
 */
type BookCardProps = {
  book: Book;
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
    height="400px"
    margin={4}
  >
    <Card.Header>
      <Heading size="md">{book.title}</Heading>
    </Card.Header>
    <Card.Body>
      {/* TODO: reduce code duplication */}
      {book.coverUri ? (
        <Image
          src={book.coverUri}
          alt={`${book.title} cover`}
          objectFit="cover"
          height="200px"
          borderRadius="md"
        />
      ) : (
        <Image
          src="/empty-cover.webp"
          alt="empty"
          objectFit="cover"
          height="200px"
          borderRadius="md"
        />
      )}
    </Card.Body>
    <Card.Footer>
      <Text fontSize="sm" color="gray.500" mt={1}>
        {book.price} • {book.rating}
      </Text>
    </Card.Footer>
  </Card.Root>
);
