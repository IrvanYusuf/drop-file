'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import Link from '@mui/material/Link';
import { Alert, Box } from '@mui/material';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { FormHead } from 'src/auth/components/form-head';
import { Form } from 'src/components/hook-form';
import { signUpSchemaValidation } from 'src/schema-validations/auth/signUpSchemaValidation';
import { useAuthContext } from 'src/auth/hooks';
import { signUpWithEmailPassword } from 'src/auth/context/jwt';
import FormOauth from '../FormOAuth/FormOAuth';
import JwtSignUpView from './jwt-sign-up-view';

export default function SignUpPage() {
  const [errorMsg, setErrorMsg] = useState('');
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const defaultValues = {
    full_name: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(signUpSchemaValidation),
    defaultValues,
  });

  const { mutate: registerUser, isLoading } = useMutation('POST', '/api/v1/auth/register');

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      const result = await signUpWithEmailPassword(data.email, data.password);

      await checkUserSession?.();

      if (result) {
        router.replace(paths.home);
      }
    } catch (error) {
      console.error(error.code);
      setErrorMsg(error.code === 'auth/email-already-in-use' ? 'Email already use' : error.message);
    }
  });
  return (
    <>
      <FormHead
        title="Get started absolutely free"
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <FormOauth />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <JwtSignUpView isSubmitting={isLoading} />
      </Form>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'end', marginTop: 2 }}>
        {`Already have an account? `}
        <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
          Sign In
        </Link>
      </Box>
    </>
  );
}
