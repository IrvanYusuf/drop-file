'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import Link from '@mui/material/Link';
import { Alert, Box } from '@mui/material';
import { FormHead } from 'src/auth/components/form-head';
import { Form } from 'src/components/hook-form';
import { signUpSchemaValidation } from 'src/schema-validations/auth/signUpSchemaValidation';
import { useAuthContext } from 'src/auth/hooks';
import { setSession, signUpWithEmailPassword } from 'src/auth/context/jwt';
import FormOauth from '../FormOAuth/FormOAuth';
import JwtSignUpView from './jwt-sign-up-view';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { endpoints } from 'src/routes/endpoints';
import { toast } from 'src/components/snackbar';
import { sendEmailVerification } from 'firebase/auth';

export default function SignUpPage({ isAdminForm = false }) {
  const [errorMsg, setErrorMsg] = useState('');
  const { checkUserSession } = useAuthContext();
  const [emailSendVerify, setEmailSendVerify] = useState(false);

  const defaultValues = {
    full_name: '',
    email: '',
    password: '',
    phone: '',
  };

  const methods = useForm({
    resolver: zodResolver(signUpSchemaValidation),
    defaultValues,
  });

  const { mutate: signUpEmailPassword } = useMutation(
    'POST',
    endpoints.auth.signUpWithEmailPassword
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      const result = await signUpWithEmailPassword(data.email, data.password);
      const providers = result.providerData.map((provider) => provider.providerId);
      const newData = {
        user_id: result.uid,
        fullname: data.full_name,
        email: result.email,
        phone: data.phone,
        password: data.password,
        isAdminForm,
        provider_id: providers[0],
      };
      console.log(result);
      signUpEmailPassword(
        { ...newData },
        {
          onSuccess: async (response) => {
            toast.success('Sign up user success!');
            setSession(response.token);
            await sendEmailVerification(result)
            setEmailSendVerify(true);

            // await checkUserSession?.();
            console.log(response);
          },
          onError: (response) => {
            toast.error('Failed sign up user!');
          },
        }
      );
    } catch (error) {
      console.error(error.code);
      toast.error('Email already use');
      setErrorMsg(error.code === 'auth/email-already-in-use' ? 'Email already use' : error.message);
    }
  });
  return (
    <>
      {emailSendVerify && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please check your email for verification!
        </Alert>
      )}
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
        <JwtSignUpView isSubmitting={isSubmitting} />
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
