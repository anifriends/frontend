import { SelectProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { FilterGroup, FilterSelect } from '.';

export type SearchFilterSelectData = {
  selectOption: Record<string, string>;
} & Pick<SelectProps, 'name' | 'placeholder' | 'value'>;

type RecruitmentsSearchFilterProps = {
  searchFilters: SearchFilterSelectData[];
  onChangeFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function SearchFilters({
  searchFilters,
  onChangeFilter,
}: RecruitmentsSearchFilterProps) {
  return (
    <FilterGroup>
      {searchFilters.map(({ selectOption, name, ...props }) => (
        <FilterSelect
          key={name}
          name={name}
          onChange={onChangeFilter}
          {...props}
        >
          {Object.entries(selectOption).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </FilterSelect>
      ))}
    </FilterGroup>
  );
}
