import { useEffect, useState } from 'react';
import { Input } from '@repo/ui-shadcn';
import { useShallow } from 'zustand/react/shallow';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { useDataGridStore } from '../../store/useDataGridStore';

const SEARCH_APPLY_DELAY_MS = 180;

export const SearchField = () => {
  const { searchQuery, filterable, setSearchQuery } = useDataGridStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      filterable: state.filterable,
      setSearchQuery: state.setSearchQuery,
    })),
  );
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearchInput = useDebouncedValue(searchInput, SEARCH_APPLY_DELAY_MS);

  useEffect(() => {
    setSearchInput((prevValue) => (prevValue === searchQuery ? prevValue : searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedSearchInput);
  }, [debouncedSearchInput, setSearchQuery]);

  return (
    <Input
      className="min-w-64"
      id="search"
      value={searchInput}
      placeholder={filterable ? 'Search...' : 'Enable "Filterable" to search'}
      disabled={!filterable}
      onChange={(event) => setSearchInput(event.currentTarget.value)}
    />
  );
};
