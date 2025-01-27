'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'src/components/snackbar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { useRouter } from 'src/routes/hooks';
import { createNewBahanSchemaValidation } from 'src/schema-validations/auth/createNewBahanSchemaValidation';
import { queryClient } from 'src/libs/query-client';
import { Field, Form } from 'src/components/hook-form';
import { Alert, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { paths } from 'src/routes/paths';
const EditBahanForm = ({ dataDetailBahan }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const defaultValues = {
    bahan: dataDetailBahan?.bahan,
  };

  console.log(dataDetailBahan);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createNewBahanSchemaValidation),
    defaultValues,
  });

  const { mutate: editBahan } = useMutation(
    'PUT',
    `/api/v1/bahan/${dataDetailBahan && dataDetailBahan.bahan_id}`
  );

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const bahanValue = watch('bahan');
  const checkBahanValueIsSame = bahanValue === dataDetailBahan.bahan;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      console.log(data);
      editBahan(data, {
        onSuccess: (response) => {
          toast.success('Berhasil update bahan');
          queryClient.invalidateQueries(['bahan']);
          queryClient.invalidateQueries([`edit-bahan-${dataDetailBahan.bahan_id}`]);
          reset();
          router.refresh();
          router.push(paths.dashboard.bahan.root);
        },
        onError: (response) => {
          toast.error('Failed update Bahan!');
          console.log(response);
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
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={checkBahanValueIsSame}
          >
            {'Update bahan'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};

export default EditBahanForm;
