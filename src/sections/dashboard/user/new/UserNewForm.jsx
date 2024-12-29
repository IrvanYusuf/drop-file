import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { Alert, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { signUpWithEmailPassword } from 'src/auth/context/jwt';
import { queryClient } from 'src/libs/query-client';
import { CreateNewUserSchemaValidation } from 'src/schema-validations/auth/createNewUserSchemaValidation copy';
import { useState } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserNewForm() {
  const password = useBoolean();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    photo: '',
    fullname: '',
    email: '',
    phone: '',
    password: '',
    country: '',
    state: '',
    city: '',
    address: '',
    role_id: '',
    description: '',
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(CreateNewUserSchemaValidation),
    defaultValues,
  });

  const { mutate: createNewUser, isLoading } = useMutation('POST', '/api/v1/users');

  // ambil role
  const { data: dataRoles, isLoading: loadingRoles } = useQuery(['roles'], '/api/v1/roles');

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      const result = await signUpWithEmailPassword(data.email, data.password);
      const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
        // Jika nilai adalah undefined atau null, set menjadi null
        acc[key] = value === undefined ? null : value;
        return acc;
      }, {});
      const { photo, ...otherData } = transformedData;

      // Mengambil hanya nama file dari 'photo' (jika ada)
      const photoName = photo ? photo.name : null;

      // Membuat objek data baru dengan nama file saja
      const newUserData = {
        ...otherData,
        user_id: result.uid,
        photo: photoName,
      };
      createNewUser(
        { ...newUserData },
        {
          onSuccess: (response) => {
            toast.success('Add New User success!');
            queryClient.invalidateQueries(['users']);
            reset();
            router.push(paths.dashboard.user.root);
          },
          onError: (response) => {
            toast.error('Failed Add New User!');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('Email already use');
      setErrorMsg(error.code === 'auth/email-already-in-use' ? 'Email already use' : error.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                disabled
                name="photo"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    For now disabled
                    <br />
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of 10MB
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="fullname" label="Full name" />
              <Field.Text name="email" label="Email address" />
              <Field.Text name="phone" label="Phone number" />
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
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
              />

              {/* <Field.Text name="country" label="Country" /> */}
              <Field.Text name="state" label="State/region" />
              <Field.Text name="city" label="City" />
              <Field.Text name="address" label="Address" />
            </Box>
            <Field.Select
              name="role_id"
              label="Role *"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 3 }}
            >
              {/* Menambahkan MenuItem kosong sebagai pilihan default */}
              <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                Choose a role
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {/* Memetakan dataRoles untuk menampilkan pilihan role */}
              {dataRoles?.map((role, i) => (
                <MenuItem key={i} value={role.role_id}>
                  {role.role}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text
              name={'description'}
              multiline
              rows={4}
              label="About"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 3 }}
            />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Create user'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
