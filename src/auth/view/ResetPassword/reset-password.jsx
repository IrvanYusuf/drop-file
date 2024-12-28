'use client';

import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import { Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from 'src/components/hook-form';
import { FormHead } from 'src/auth/components/form-head';
import PasswordIcon from 'src/assets/icons/password-icon';
import { ResetPasswordSchemaValidation } from 'src/schema-validations/auth/resetPasswordSchemaValidation';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const defaultValues = { email: '' };

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchemaValidation),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Forgot your password?"
        description={`Please enter the email address associated with your account and we'll email you a link to reset your password.`}
      />

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
            loading={false}
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
