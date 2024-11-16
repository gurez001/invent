import { useState, useCallback } from 'react';

const useSearch = (initialValue: string = "", setPage: (value: number) => void) => {
  const [filterValue, setFilterValue] = useState(initialValue);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1); // Reset page when search value changes
    } else {
      setFilterValue("");
    }
  }, [setPage]);

  return {
    filterValue,
    onSearchChange,
  };
};

export default useSearch;
