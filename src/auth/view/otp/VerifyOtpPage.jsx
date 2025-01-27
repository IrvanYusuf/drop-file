'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, FormHelperText } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PasswordIcon from 'src/assets/icons/password-icon';
import { FormHead } from 'src/auth/components/form-head';
import { Form } from 'src/components/hook-form';
import { otpVerifySchemaValidation } from 'src/schema-validations/auth/otpVerifySchemaValidation';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const defaultValues = { otp: '' };

  const methods = useForm({
    resolver: zodResolver(otpVerifySchemaValidation),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
      console.log(errors);
    } catch (error) {
      console.error(error);
    }
  });

  console.log(errors);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FormHead
          icon={<PasswordIcon />}
          title="Verify OTP"
          description={`Please enter the OTP sent to your email to proceed.`}
        />

        <Form methods={methods} onSubmit={onSubmit}>
          <Box gap={3} display="flex" flexDirection="column">
            <Controller
              name="otp"
              control={control}
              rules={{ validate: (value) => value.length === 6 }}
              render={({ field, fieldState }) => (
                <Box>
                  <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                  {fieldState.invalid ? (
                    <FormHelperText error sx={{ textAlign: 'center' }}>
                      {fieldState.error.message === 'Expected number, received string'
                        ? 'OTP must be number'
                        : fieldState.error.message}
                    </FormHelperText>
                  ) : null}
                </Box>
              )}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={false}
              loadingIndicator="Send request..."
            >
              Verify
            </LoadingButton>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default VerifyOtpPage;
