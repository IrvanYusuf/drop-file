'use client';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Card, Divider, InputAdornment, MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { useRouter } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { createNewProductSchemaValidation } from 'src/schema-validations/auth/createNewProductSchemaValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from 'src/routes/paths';
import { queryClient } from 'src/libs/query-client';
const ProductNewForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const defaultValues = {
    product_name: '',
    bahan_id: '',
    product_price: 0,
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createNewProductSchemaValidation),
    defaultValues,
  });

  //   ambil semua bahan
  const { data: dataBahan } = useQuery([], '/api/v1/bahan/v2');

  const { mutate: createNewProduct, isLoading } = useMutation('POST', '/api/v1/products');

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    try {
      console.log(data);
      toast.success('Berhasil tambah product!');
      createNewProduct(data, {
        onSuccess: (response) => {
          queryClient.invalidateQueries(['products']);
          reset();
          router.push(paths.dashboard.product.root);
        },
        onError: (response) => {
          toast.error('Failed Add New Product!');
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
        <Field.Text name="product_name" label="Product Name" />
        <Field.Select
          name="bahan_id"
          label="Bahan"
          InputLabelProps={{ shrink: true }}
          sx={{ my: 3 }}
        >
          {/* Menambahkan MenuItem kosong sebagai pilihan default */}
          <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Choose a bahan
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Memetakan data bahan untuk menampilkan pilihan bahan */}
          {dataBahan?.map((bahan, i) => (
            <MenuItem key={i} value={bahan.bahan_id}>
              {bahan.bahan}
            </MenuItem>
          ))}
        </Field.Select>
        <Field.Text
          name="product_price"
          label="Product Price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  Rp
                </Box>
              </InputAdornment>
            ),
          }}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {'Create product'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};

export default ProductNewForm;
