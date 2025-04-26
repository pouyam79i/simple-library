import { HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SearchInput } from './SearchInput';
import { SortSelect } from './SortSelect';
import ColorModeButton from './ColorModeButton';

/**
 * Navbar props
 */
type NavbarProps = {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  initialSearch?: string;
  initialSort?: string;
};

/**
 * This components contain navbar structure and content
 * @param onSearch on search event callback
 * @param onSort on sort event callback
 * @param initialSearch initial search value
 */
export const Navbar = ({ onSearch, onSort, initialSearch = '' }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  return (
    <HStack justify={'space-between'}>
      <ColorModeButton />
      <SearchInput value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      <SortSelect onChange={(val) => onSort(val)} />
    </HStack>
  );
};
