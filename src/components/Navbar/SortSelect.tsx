import { createListCollection, Portal, Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

// TODO: refactor name of sort to FilterSelect

/**
 * Sort select props
 */
type SortSelectProps = {
  onChange: (value: string) => void;
};

/**
 * Global sort options
 * TODO: why should it be hard coded
 */
const sort_options = createListCollection({
  items: [
    { label: 'کتاب های صوتی', value: 'vocal' },
    { label: 'فقط کتاب های موجود', value: 'in-stock' },
  ],
});

/**
 * This component handles sort selection
 * @param onChange on select value changes
 */
export const SortSelect = ({ onChange }: SortSelectProps) => {
  return (
    <Select.Root
      collection={sort_options}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      margin={4}
    >
      <Select.HiddenSelect />
      <Select.Control justifyContent="space-between">
        <Select.Indicator
          style={{
            position: 'absolute',
            left: 0,
            height: '100%',
            padding: 8,
          }}
        />
        <Select.ClearTrigger
          style={{
            position: 'absolute',
            left: 20,
            height: '100%',
            padding: 8,
          }}
        />
        <Select.Trigger>
          <Select.ValueText placeholder="فیلتر" />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {sort_options.items.map((option) => (
              <Select.Item key={option.value} item={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
