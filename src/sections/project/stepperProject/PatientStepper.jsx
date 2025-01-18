import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';

const PatientStepper = ({ onValid, formData, handleBack }) => {
  const methods = useForm({
    mode: 'onSubmit',
    // resolver: zodResolver(createProjectSchemaValidation),
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
      <Field.Text name="patient_name" label="Nama Pasien" sx={{ my: 3 }} />
      <Field.Text name="patient_no_hp" label="No Hp Pasien" />
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

export default PatientStepper;
