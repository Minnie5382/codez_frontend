import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    difficulty: '',
    language: '',
    type: '',
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <FiltersContext.Provider value={{ filters, handleFilterChange }}>
      {children}
    </FiltersContext.Provider>
  );
};
