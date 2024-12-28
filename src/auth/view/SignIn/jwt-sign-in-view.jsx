'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

import { CircularProgress, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function JwtSignInView({ isSubmitting }) {
  const password = useBoolean();

  return (
    <>
      <Box gap={3} display="flex" flexDirection="column">
        <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

        <Box gap={1.5} display="flex" flexDirection="column">
          <Field.Text
            name="password"
            label="Password"
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

          <Link
            component={RouterLink}
            href={paths.auth.resetPassword}
            variant="body2"
            color="inherit"
            sx={{ alignSelf: 'flex-end' }}
          >
            Forgot password?
          </Link>
        </Box>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator={
            <>
              <CircularProgress size={24} color="inherit" sx={{ marginRight: 2 }} />
              <Typography>Sign in...</Typography>
            </>
          }
        >
          Sign in
        </LoadingButton>
      </Box>
    </>
  );
}
