import { Box, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';
import { TeethDisplay } from './teeth-display';
import TableProduct from './TableProduct';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { productStepperSchemaValidation } from 'src/schema-validations/stepper/projectStepperSchemaValidation';

const ProductStepper = ({ handleBack, onValid, formData }) => {
  const methods = useForm({
    defaultValues: {
      ...formData,
      position: formData.position || [],
      products: formData.products || [
        { productId: '', productName: '', color: '', price: 0, positions: [] },
      ],
    },
    resolver: zodResolver(productStepperSchemaValidation),
  });

  const { data: dataProducts = [], isLoading } = useQuery(['products'], '/api/v1/products');

  const {
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const product = watch('product');
  const color = watch('color');
  let products = [...(watch('products') || [])].map((product) => ({
    ...product,
    positions: [...product.positions],
  }));
  const productFilter = dataProducts.find((value) => value.product_id === product);

  const currentPositions = watch('position') || [];

  const handleSelect = (position) => {
    const newPositions = currentPositions.includes(position)
      ? currentPositions.filter((p) => p !== position)
      : [...currentPositions, position];

    setValue('position', newPositions); // Update posisi saat ini

    // Jika posisi baru kosong, reset produk sepenuhnya
    if (newPositions.length === 0) {
      setValue('products', []);
      return;
    }

    const existingProductIndex = products.findIndex(
      (product) => product.productId === productFilter.product_id
    );

    if (existingProductIndex !== -1) {
      // Update produk yang ada
      const existingProduct = products[existingProductIndex];
      const updatedPositions = newPositions.filter(
        (pos) => existingProduct.positions.includes(pos) || pos === position
      );

      if (updatedPositions.length === 0) {
        // Hapus produk jika posisi kosong
        products.splice(existingProductIndex, 1);
      } else {
        // Update posisi produk
        products[existingProductIndex] = {
          ...existingProduct,
          positions: updatedPositions,
        };
      }
    } else {
      // Tambahkan produk baru jika belum ada
      products = [
        ...products,
        {
          productId: productFilter.product_id,
          productName: productFilter.name,
          color,
          price: parseFloat(productFilter.price),
          positions: [position],
        },
      ];
    }

    // Update nilai produk di form
    setValue('products', products);
  };

  // const handleSelect = (position) => {
  //   const newPositions = currentPositions.includes(position)
  //     ? currentPositions.filter((p) => p !== position)
  //     : [...currentPositions, position];

  //   setValue('position', newPositions); // Update posisi saat ini

  //   // Jika posisi baru kosong, reset produk sepenuhnya
  //   if (newPositions.length === 0) {
  //     setValue('products', []); // Reset produk
  //     return;
  //   }

  //   const existingProductIndex = products.findIndex(
  //     (product) => product.productId === productFilter?.product_id
  //   );

  //   let updatedProducts = [...products]; // Buat salinan array products
  //   if (existingProductIndex !== -1) {
  //     // Produk sudah ada, update posisinya
  //     const updatedPositions = [
  //       ...new Set([...products[existingProductIndex].positions, ...newPositions]),
  //     ];
  //     updatedProducts[existingProductIndex] = {
  //       ...products[existingProductIndex],
  //       positions: updatedPositions,
  //     };
  //   } else if (productFilter) {
  //     // Tambahkan produk baru jika belum ada
  //     updatedProducts.push({
  //       productId: productFilter.product_id,
  //       productName: productFilter.name,
  //       color,
  //       price: parseFloat(productFilter.price),
  //       positions: [position],
  //     });
  //   }

  //   setValue('products', updatedProducts); // Perbarui nilai products di form
  // };

  const onSubmit = handleSubmit((data) => {
    const formValues = getValues();
    onValid(formValues);
  });

  const handleDeleteProductInTable = (position) => {
    const updatedProducts = products
      .map((product) => {
        if (product.positions.includes(position)) {
          // Hapus posisi dari produk
          const updatedPositions = product.positions.filter((pos) => pos !== position);
          // Jika tidak ada posisi tersisa, hapus produk
          return updatedPositions.length ? { ...product, positions: updatedPositions } : null;
        }
        return product;
      })
      .filter(Boolean); // Hapus produk yang null

    // Perbarui state
    setValue('products', updatedProducts);
  };

  const selectedPositions = watch('products') || [];

  useEffect(() => {
    methods.reset({
      ...formData,
      position: formData.position || [],
      products: formData.products || [],
    });
  }, [formData, methods]);

  console.log(errors);

  if (isLoading) {
    return <Typography>loading....</Typography>;
  }

  console.log(formData);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field.Select name="product" label="Product" sx={{ mt: 3 }}>
        <MenuItem value="">Choose a product</MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {dataProducts.map((data, i) => (
          <MenuItem key={i} value={data.product_id}>
            {data.name}
          </MenuItem>
        ))}
      </Field.Select>
      <Field.Text name="color" label="Color" sx={{ my: 3 }} />
      <TeethDisplay selected={watch('products')} onSelect={handleSelect} />

      <Box mt={3}>
        <TableProduct
          selectedProduct={selectedPositions}
          handleDeleteProductInTable={handleDeleteProductInTable}
        />
      </Box>
      <Stack justifyContent="end" alignItems={'end'} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Stack>
    </Form>
  );
};

export default ProductStepper;
