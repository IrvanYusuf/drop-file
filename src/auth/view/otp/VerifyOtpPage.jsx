'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, FormHelperText, IconButton, InputAdornment, Link } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PasswordIcon from 'src/assets/icons/password-icon';
import { FormHead } from 'src/auth/components/form-head';
import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { endpoints } from 'src/routes/endpoints';
import { paths } from 'src/routes/paths';
import { otpVerifySchemaValidation } from 'src/schema-validations/auth/otpVerifySchemaValidation';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------
const VerifyOtpPage = () => {
  const password = useBoolean();
  const email = localStorage.getItem('email_reset_password');
  const [errorMsg, setErrorMsg] = useState('');
  const [isExpired, setisExpired] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const router = useRouter();
  // const handleChange = (newValue) => {
  //   setOtp(newValue);
  // };
  console.log(email);

  const defaultValues = { otp: '', password: '', confirmPassword: '' };

  const { mutate: handleUpdatePassword } = useMutation('PUT', endpoints.auth.updatePassword);

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
    const payload = {
      password: data.password,
      email,
      otp: data.otp,
    };
    try {
      handleUpdatePassword(
        { ...payload },
        {
          onSuccess: (response) => {
            setErrorMsg('');
            setCountDown(10);
            setisExpired(false);
            console.info('DATA', data);
            setIsSuccess(true);
          },
          onError: (error) => {
            const responseErr = error.response.data.errors[0];
            setErrorMsg(responseErr.expired || responseErr.otp);
            setIsSuccess(false);
            if (responseErr.expired) {
              setisExpired(true);
            } else {
              setisExpired(false);
            }
            console.log('err');
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (isSuccess && countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (countDown === 0) {
      router.push(paths.auth.signIn);
    }
  }, [isSuccess, countDown, router]);
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
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
            {isExpired && (
              <Link
                sx={{ ml: '4px', color: 'inherit', textDecoration: 'underline' }}
                component={RouterLink}
                href={paths.auth.resetPassword}
              >
                request otp
              </Link>
            )}
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Update password success, Redirecting in {countDown} seconds...
          </Alert>
        )}
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
            <Field.Text
              name="password"
              label="New Password"
              placeholder="6+ characters"
              type={password.value ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Field.Text
              name="confirmPassword"
              label="Confirm Password"
              placeholder="6+ characters"
              type={password.value ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
