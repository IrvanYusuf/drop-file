import { Box, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

const TransactionPage = () => {
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
        icon="eva:folder-fill"
        sx={{ mr: 1 }}
        width={48}
        height={48}
        color="text.secondary"
      />
      <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
        You haven't made any transactions yet.
      </Typography>
    </Box>
  );
};

export default TransactionPage;
