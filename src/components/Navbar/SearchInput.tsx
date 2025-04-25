import { Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

/**
 * Search input props
 */
type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * This component handles search input components
 * @param value given search value
 * @param onChange search text change event handler
 */
export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <InputGroup margin={4} startElement={<LuSearch />}>
    <Input placeholder="جست و جو ..." value={value} onChange={(e) => onChange(e.target.value)} />
  </InputGroup>
);
