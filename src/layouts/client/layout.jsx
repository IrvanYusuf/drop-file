'use client';

import { Container, useTheme } from '@mui/material';
import LayoutDesktop from './layoutDesktop';
import { useAuthContext } from 'src/auth/hooks';
const ClientLayout = ({ children }) => {
  const { user } = useAuthContext();
  const layoutQuery = 'sm';
  const theme = useTheme();
  return (
    <>
      <LayoutDesktop layoutQuery={layoutQuery} user={user} children={children} />
      <Container
        sx={{
          display: {
            xs: 'block', // Tampil di ukuran xs (mobile)
            sm: 'none', // Sembunyi mulai dari sm ke atas (tablet, desktop)
          },
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default ClientLayout;
