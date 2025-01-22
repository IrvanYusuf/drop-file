'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { setSession, signInOrSignUpWithGoogle } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import { Form } from 'src/components/hook-form';
import { endpoints } from 'src/routes/endpoints';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useForm } from 'react-hook-form';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { toast } from 'src/components/snackbar';

const FormOauth = ({ showOr = true }) => {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  const methods = useForm();
  const { mutate: signInWithGoogle, isLoading } = useMutation(
    'POST',
    endpoints.auth.signInWithGoogle
  );

  const onClick = async (data) => {
    try {
      const result = await signInOrSignUpWithGoogle();
      const newData = {
        user_id: result.uid,
        fullname: result.displayName,
        email: result.email,
        phone: result.phoneNumber,
      };
      console.log(newData);
      console.log(result);

      signInWithGoogle(
        { ...newData },
        {
          onSuccess: async (response) => {
            toast.success('Sign in User success!');
            setSession(response.token);
            await checkUserSession?.();
            console.log(response);
          },
          onError: (response) => {
            toast.error('Failed Sign In!');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('Sign-in failed. Please try again.');
    }
  };
  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        type="submit"
        onClick={onClick}
      >
        <Image src={'/assets/images/google.webp'} alt="image login" width={35} height={35} />
        Google
      </Button>
      {showOr && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 3, marginTop: 2 }}
        >
          <Box
            sx={{ width: '100%', height: '3px', backgroundColor: '#DFE3E8', borderRadius: '6px' }}
          ></Box>
          <Typography>Or</Typography>
          <Box
            sx={{ width: '100%', height: '3px', backgroundColor: '#DFE3E8', borderRadius: '6px' }}
          ></Box>
        </Box>
      )}
    </>
  );
};

export default FormOauth;
