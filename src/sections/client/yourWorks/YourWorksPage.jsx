import { Box, Typography } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';

const YourWorksPage = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Iconify
        icon="solar:clipboard-text-bold"
        sx={{ mr: 1 }}
        width={48}
        height={48}
        color="text.secondary"
      />
      <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
        You haven't made any works yet.
      </Typography>
    </Box>
  );
};

export default YourWorksPage;
