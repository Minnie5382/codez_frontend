import * as React from 'react';
import CustomSelect from '../select/CustomSelect';
import style from './DropDown.module.css';

function DropDown({ onFilterChange }) {
  const handleChange = (filterType) => (selectedValue) => {
    onFilterChange(filterType, selectedValue);
  };

  return (
    <div className={style.selectBox}>
      <CustomSelect
        label='난이도'
        options={[
          { value: '', label: '전체' },
          { value: 'EASY', label: 'EASY' },
          { value: 'MEDIUM', label: 'MEDIUM' },
          { value: 'HARD', label: 'HARD' },
        ]}
        onChange={handleChange('difficulty')}
      />
      <CustomSelect
        label='언어'
        options={[
          { value: '', label: '전체' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
        ]}
        onChange={handleChange('language')}
      />
      <CustomSelect
        label='유형'
        options={[
          { value: '', label: '전체' },
          { value: 'HASH', label: '해시' },
          { value: 'STACKQUEUE', label: '스택/큐' },
          { value: 'HEAP', label: '힙' },
          { value: 'SORT', label: '정렬' },
          { value: 'DFSBFS', label: 'DFS/BFS' },
          { value: 'GREEDY', label: '그리디' },
          { value: 'DP', label: 'DP' },
        ]}
        onChange={handleChange('type')}
      />
    </div>
  );
}

export default DropDown;
