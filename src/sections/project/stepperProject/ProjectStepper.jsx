import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
import { createProjectSchemaValidation } from 'src/schema-validations/auth/createProjectSchemaValidation';

const ProjectStepper = ({ onValid, formData }) => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createProjectSchemaValidation),
    defaultValues: formData, // Menggunakan formData yang diteruskan dari parent
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit = handleSubmit((data) => {
    // Mengambil nilai terbaru dari form (data)
    const formValues = getValues(); // Ambil data form secara langsung

    // Kirimkan data ke parent menggunakan callback onValid
    onValid(formValues); // Callback ke parent untuk melanjutkan ke langkah berikutnya
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field.Text name="title" label="Title Project" sx={{ mt: 3 }} />
      <Field.Text
        name={'description'}
        multiline
        rows={6}
        label="Description"
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 3 }}
      />
      <Stack justifyContent={'center'} sx={{ width: '100%' }} alignItems={'end'}>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Stack>
    </Form>
  );
};

export default ProjectStepper;
