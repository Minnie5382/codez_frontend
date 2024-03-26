import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Search({ onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
        height: '30px',
      }}
    >
      <TextField
        id='demo-helper-text-misaligned-no-helper'
        label='검색'
        onChange={handleSearchChange}
        sx={{
          '& .MuiInputBase-root': {
            color: '#fff',
            height: '40px',
            borderRadius: '15px',
            boxSizing: 'border-box',
            backgroundColor: '#232326',
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none',
          },
          '& label': {
            color: '#fff',
            lineHeight: '1',
          },
          '& .MuiInputBase-input': {
            width: '200px',
            height: '10px',
          },
          '& .MuiInputLabel-root': {
            marginTop: '-4px',
          },
          '& .MuiFormControl-root': {
            boxSizing: 'border-box',
          },
        }}
      />
    </Box>
  );
}
