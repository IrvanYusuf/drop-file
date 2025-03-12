'use client';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import ForbiddenIllustration from 'src/assets/illustrations/forbidden-illustration';
import { MotionContainer, varBounce } from 'src/components/animate';
import { CONFIG } from 'src/config-global';
import { m } from 'framer-motion';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import firebase from 'firebase/app';
import { applyActionCode } from 'firebase/auth';
import { auth } from 'src/libs/firebase/config';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { endpoints } from 'src/routes/endpoints';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { useRouter } from 'src/routes/hooks';
import { setSession } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';

const VerifyEmailPage = () => {
  const imageUrl = `${CONFIG.assetsDir}/assets/illustrations/characters/character-3.webp`;
  const search = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  const [email, setEmail] = useState('');
  const oobCode = search.get('oobCode');

  if (!oobCode) {
    return router.replace(paths.home);
  }
  const handleVerifyOobCode = async () => {
    try {
      // Mendapatkan oobCode dari query parameter
      if (!oobCode) {
        throw new Error('Invalid verification code');
      }

      // Apply action code to verify email
      // await applyActionCode(auth, oobCode);
      setIsVerified(true);
      setEmail(search.get('email')); // Set the email for the mutation

      // Verifikasi berhasil
    } catch (error) {
      // Menangani error jika terjadi
      console.error('Error verifying email:', error.message);
    }
  };

  useEffect(() => {
    handleVerifyOobCode();
  }, []);

  // Use useMutation with the endpoint to update email verification
  const { mutate, error, isLoading } = useMutation('PUT', endpoints.auth.updateEmailVerify);

  const verifyData = {
    email,
    is_verified: true,
  };
  console.log(verifyData);

  // Trigger the mutation when the email is verified
  useEffect(() => {
    if (isVerified && email) {
      mutate(
        { ...verifyData },
        {
          onSuccess: (response) => {
            console.log('Email verification updated successfully:', response);
            setSession(response.token);
            setTimeout(async () => {
              await checkUserSession?.();
              router.refresh();
            }, 1200);
          },
          onError: (err) => {
            console.error('Error updating email verification:', err);
          },
        }
      ); // Trigger the mutation
    }
  }, [isVerified, email, mutate]);

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
        {isVerified ? (
          <Typography variant="h3" sx={{ mb: 2 }}>
            Your email has been verified
          </Typography>
        ) : (
          'Verifying email...'
        )}
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          You can now sign in with your new account
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <img src={imageUrl} height="300" x="220" y="30" />
      </m.div>
      {/* <m.div variants={varBounce().in} style={{ marginTop: '20px' }}>
        <Link component={RouterLink} href={paths.auth.signIn}>
          <Button size="small" variant="contained">
            Login Now
          </Button>
        </Link>
      </m.div> */}
    </Container>
  );
};

export default VerifyEmailPage;
