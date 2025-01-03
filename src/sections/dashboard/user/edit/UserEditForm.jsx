import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import {
  CreateNewUserSchemaValidation,
  editUserSchemaValidation,
} from 'src/schema-validations/auth/editUserSchemaValidation';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { Divider, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { signUpWithEmailPassword } from 'src/auth/context/jwt';
import { queryClient } from 'src/libs/query-client';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserEditForm({ currentUser }) {
  const password = useBoolean();
  const router = useRouter();

  const defaultValues = {
    photo: currentUser?.photo,
    fullname: currentUser?.fullname,
    email: currentUser?.email,
    phone: currentUser?.phone,
    country: currentUser?.country || '',
    state: currentUser?.state || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    role_id: currentUser?.role_id || '',
    description: currentUser?.description || '',
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(editUserSchemaValidation),
    defaultValues,
  });

  // Edit user
  const { mutate: editUser } = useMutation(
    'PUT',
    `/api/v1/users/${currentUser && currentUser.user_id}`
  );

  // ambil role
  const { data: dataRoles, isLoading: loadingRoles } = useQuery(['roles'], '/api/v1/roles');

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
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
        photo: photoName,
      };

      editUser(
        { ...newUserData },
        {
          onSuccess: (response) => {
            console.log(newUserData);
            toast.success('Edit User success!');
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
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
              <Field.Text name="email" label="Email address" disabled />
              <Field.Text name="phone" label="Phone number" />
              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
              />

              <Field.Text name="state" label="State/region" />
              <Field.Text name="city" label="City" />
            </Box>
            <Field.Text name="address" label="Address" sx={{ mt: 3 }} />
            <Field.Select
              name="role_id"
              label="Role *"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 3 }}
            >
              <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                Choose a role
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

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
                {'Update user'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
