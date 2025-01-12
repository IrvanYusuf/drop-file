'use client';

import { Alert, Box } from '@mui/material';
import React, { useState } from 'react';
import { RouterLink } from 'src/routes/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchemaValidation } from 'src/schema-validations/auth/signInSchemaValidation';
import { paths } from 'src/routes/paths';
import { Form } from 'src/components/hook-form';
import Link from '@mui/material/Link';
import { FormHead } from 'src/auth/components/form-head';
import { setSession, signInWithEmailPassword } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import FormOauth from '../FormOAuth/FormOAuth';
import JwtSignInView from './jwt-sign-in-view';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { endpoints } from 'src/routes/endpoints';
import { toast } from 'src/components/snackbar';
export default function SignInPage({ formOAuthShow = true }) {
  const [errorMsg, setErrorMsg] = useState('');

  const { checkUserSession } = useAuthContext();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(signInSchemaValidation),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: signInEmailPassword } = useMutation(
    'POST',
    endpoints.auth.signInWithEmailPassword
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signInWithEmailPassword(data.email, data.password);
      const payload = {
        user_id: result.uid,
        email: data.email,
        password: data.password,
      };

      signInEmailPassword(
        { ...payload },
        {
          onSuccess: async (response) => {
            toast.success('Signin User success!');
            setSession(response.token);
            await checkUserSession?.();
          },
          onError: (response) => {
            toast.error('Failed Login!');
          },
        }
      );
    } catch (error) {
      console.error(error);
      setErrorMsg('Login failed'); // Or show error message if necessary
    }
  });

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={null}
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />
      {formOAuthShow && <FormOauth />}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <JwtSignInView isSubmitting={isSubmitting} />
      </Form>
      {formOAuthShow && (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'end', marginTop: 2 }}>
          {`Don’t have an account? `}
          <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
            Sign Up
          </Link>
        </Box>
      )}
    </>
  );
}
