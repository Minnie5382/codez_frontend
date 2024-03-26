import React, { useState } from 'react';
import DropDown from '../../../components/dropdown/DropDown';
import Search from '../../../components/search/Search';
import ProblemsBox from '../../../components/problemsBox/ProblemsBox';
import style from '../Main.module.css';
import { useFilters } from '../../../components/context/FiltersContext';

const LeftContainer = () => {
  const { filters, handleFilterChange } = useFilters();
  const [searchQuery, serSearchQuery] = useState('');

  return (
    <div className={style.leftContainer}>
      <div className={style.dropBox}>
        <DropDown onFilterChange={handleFilterChange} />
        <Search onSearchChange={serSearchQuery} />
      </div>
      <ProblemsBox filters={filters} searchQuery={searchQuery} />
    </div>
  );
};

export default LeftContainer;
