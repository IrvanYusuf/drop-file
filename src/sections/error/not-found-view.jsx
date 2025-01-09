'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function NotFoundView() {
  const { user } = useAuthContext();
  const router = useRouter();
  const onClick = () => {
    if (user) {
      if (user.role !== 'ADMIN') {
        router.replace(paths.home);
      } else {
        router.replace(paths.dashboard.root);
      }
    } else {
      router.replace(paths.home);
    }
  };
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer} sx={{ pt: 0 }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button onClick={onClick} size="large" variant="contained">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}
