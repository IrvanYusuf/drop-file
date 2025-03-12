import { Box, Container, Link } from '@mui/material';
import { Logo } from 'src/components/logo';
import { RouterLink } from 'src/routes/components';

export function HomeFooter({ sx }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © All rights reserved.
          <br /> made by
          <Link component={RouterLink} href="https://minimals.cc/">
            {' '}
            minimals.cc{' '}
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
