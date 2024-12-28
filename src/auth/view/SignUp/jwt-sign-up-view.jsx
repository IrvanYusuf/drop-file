'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export default function JwtSignUpView({ isSubmitting }) {
  const password = useBoolean();

  return (
    <>
      <Box gap={3} display="flex" flexDirection="column">
        <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
          <Field.Text name="full_name" label="Full name" InputLabelProps={{ shrink: true }} />
        </Box>

        <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />

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

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Create account..."
        >
          Create account
        </LoadingButton>
      </Box>
    </>
  );
}
