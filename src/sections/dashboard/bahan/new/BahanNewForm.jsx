'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { createNewBahanSchemaValidation } from 'src/schema-validations/auth/createNewBahanSchemaValidation';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { queryClient } from 'src/libs/query-client';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BahanNewForm() {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const defaultValues = {
    bahan: '',
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createNewBahanSchemaValidation),
    defaultValues,
  });

  const { mutate: createNewBahan, isLoading } = useMutation('POST', '/api/v1/bahan');

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      console.log(data);
      createNewBahan(data, {
        onSuccess: (response) => {
          toast.success('Berhasil tambah bahan');
          queryClient.invalidateQueries(['bahan']);
          reset();
          router.push(paths.dashboard.bahan.root);
        },
        onError: (response) => {
          toast.error('Failed Add New Bahan!');
        },
      });
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Card sx={{ p: 3 }}>
        <Field.Text name="bahan" label="Bahan" />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {'Create bahan'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
