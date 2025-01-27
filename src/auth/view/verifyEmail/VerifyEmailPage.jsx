'use client';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import ForbiddenIllustration from 'src/assets/illustrations/forbidden-illustration';
import { MotionContainer, varBounce } from 'src/components/animate';
import { CONFIG } from 'src/config-global';
import { m } from 'framer-motion';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const VerifyEmailPage = () => {
  const imageUrl = `${CONFIG.assetsDir}/assets/illustrations/characters/character-3.webp`;
  console.log(imageUrl);

  return (
    <Container
      component={MotionContainer}
      sx={{
        textAlign: 'center',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Your email has been verified
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          You can now sign in with your new account
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        {/* <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} /> */}
        {/* <Box width="100%" height="100%" component={'image'}> */}
        <img src={imageUrl} height="300" x="220" y="30" />
        {/* </Box> */}
      </m.div>
      <m.div variants={varBounce().in} style={{ marginTop: '20px' }}>
        <Link component={RouterLink} href={paths.auth.signIn}>
          <Button size="small" variant="contained">
            Login Now
          </Button>
        </Link>
      </m.div>
    </Container>
  );
};

export default VerifyEmailPage;
