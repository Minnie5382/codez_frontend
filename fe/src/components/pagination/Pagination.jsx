import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize({ currentPage, setPage, totalPages }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#fff',
            '&:hover': {
              backgroundColor: 'deepskyblue',
            },
          },

          '& .Mui-selected': {
            backgroundColor: '#1689ff',
            color: 'white',
          },

          '& .MuiPaginationItem-ellipsis': {
            color: 'white',
          },
        }}
      />
    </Stack>
  );
}
