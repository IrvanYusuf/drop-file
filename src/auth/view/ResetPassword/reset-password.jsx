'use client';

import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import { Alert, Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from 'src/components/hook-form';
import { FormHead } from 'src/auth/components/form-head';
import PasswordIcon from 'src/assets/icons/password-icon';
import { ResetPasswordSchemaValidation } from 'src/schema-validations/auth/resetPasswordSchemaValidation';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { endpoints } from 'src/routes/endpoints';
import { toast } from 'src/components/snackbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const defaultValues = { email: '' };
  
  const [isSendEmailSuccess, setIsSendEmailSuccess] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchemaValidation),
    defaultValues,
  });

  const { mutate: sendEmail } = useMutation('POST', endpoints.auth.sendEmailOtp);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      sendEmail(
        { ...data },
        {
          onSuccess: (response) => {
            console.log('response', response);
            setCountDown(10);
            setIsSendEmailSuccess(true);
            setIsLoading(false);
            localStorage.setItem('email_reset_password', data.email);
          },
          onError: (error) => {
            console.log('err', error);
            setIsLoading(false);
          },
        }
      );
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (isSendEmailSuccess && countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (countDown === 0) {
      router.push(paths.auth.otpVerify);
    }
  }, [isSendEmailSuccess, countDown, router]);
  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Forgot your password?"
        description={`Please enter the email address associated with your account and we'll email you a link to reset your password.`}
      />

      {isSendEmailSuccess && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Check your email for OTP, Redirecting in {countDown} seconds...
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <Box gap={3} display="flex" flexDirection="column">
          <Field.Text
            autoFocus
            name="email"
            label="Email address"
            placeholder="example@gmail.com"
            InputLabelProps={{ shrink: true }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator="Send request..."
          >
            Send request
          </LoadingButton>
        </Box>
      </Form>

      <Link
        component={RouterLink}
        href={paths.auth.signIn}
        variant="subtitle2"
        color="inherit"
        sx={{ alignSelf: 'flex-end', marginTop: 2 }}
      >
        Back to Sign in
      </Link>
    </>
  );
}
