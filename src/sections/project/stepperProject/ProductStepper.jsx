import { Box, Button, Divider, MenuItem, Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';
import { TeethDisplay } from './teeth-display';
import TableProduct from './TableProduct';

const dataProductsDummy = [
  { value: 'product a', text: 'Product A' },
  { value: 'product b', text: 'Product B' },
  { value: 'product c', text: 'Product C' },
];

const ProductStepper = ({ handleBack, onValid, formData }) => {
  const methods = useForm({
    defaultValues: {
      ...formData,
      position: formData.position || [],
    },
  });

  const { handleSubmit, getValues, setValue, watch } = methods;

  const handleSelect = (position) => {
    const currentPositions = watch('position') || [];
    const newPositions = currentPositions.includes(position)
      ? currentPositions.filter((p) => p !== position)
      : [...currentPositions, position];
    setValue('position', newPositions);
  };

  const onSubmit = handleSubmit((data) => {
    onValid(data);
  });

  const selectedPositions = watch('position') || [];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field.Select name="product" label="Product" sx={{ mt: 3 }}>
        <MenuItem value="">Choose a product</MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {dataProductsDummy.map((data, i) => (
          <MenuItem key={i} value={data.value}>
            {data.text}
          </MenuItem>
        ))}
      </Field.Select>
      <Field.Text name="color" label="Color" sx={{ my: 3 }} />
      <TeethDisplay selected={selectedPositions} onSelect={handleSelect} />
      <Box mt={3}>
        <TableProduct selectedProduct={selectedPositions}/>
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
