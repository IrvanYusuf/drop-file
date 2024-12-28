'use client';

import { Alert, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RouterLink } from 'src/routes/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchemaValidation } from 'src/schema-validations/auth/signInSchemaValidation';
import { paths } from 'src/routes/paths';
import { Form } from 'src/components/hook-form';
import Link from '@mui/material/Link';
import { useRouter } from 'src/routes/hooks';
import { FormHead } from 'src/auth/components/form-head';
import { signInWithEmailPassword } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import FormOauth from '../FormOAuth/FormOAuth';
import JwtSignInView from './jwt-sign-in-view';

export default function SignInPage({ formOAuthShow = true }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);
  const router = useRouter();

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

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmittingTest(true);

    try {
      const result = await signInWithEmailPassword(data.email, data.password);
      await checkUserSession?.();
      if (result) {
        router.replace(paths.home);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Login failed'); // Or show error message if necessary
    } finally {
      setIsSubmittingTest(false);
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
        <JwtSignInView isSubmitting={isSubmittingTest} />
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
