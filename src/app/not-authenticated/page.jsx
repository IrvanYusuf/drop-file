'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { Button } from '@mui/material';
const page = ({ sx }) => {
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
    <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Permission denied
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          You do not have permission to access this page.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </m.div>
      <m.div variants={varBounce().in}>
        <Button onClick={onClick} size="large" variant="contained">
          Go to home
        </Button>
      </m.div>
    </Container>
  );
};

export default page;
