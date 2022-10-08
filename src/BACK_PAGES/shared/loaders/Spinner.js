import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex' }} style={{ margin: 'auto' }}>
      <CircularProgress>
        <span>Loading ...</span>
      </CircularProgress>
    </Box>
  );
}
