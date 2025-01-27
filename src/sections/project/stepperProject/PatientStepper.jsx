import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
import { patientStepperSchemaValidation } from 'src/schema-validations/stepper/projectStepperSchemaValidation';

const PatientStepper = ({ onValid, formData, handleBack }) => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(patientStepperSchemaValidation),
    defaultValues: {
      ...formData,
      patients: formData.patients || { patientName: '', patientPhone: '' },
    }, // Menggunakan formData yang diteruskan dari parent
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit = handleSubmit((data) => {
    // Mengambil nilai terbaru dari form (data)
    const formValues = getValues(); // Ambil data form secara langsung

    // Kirimkan data ke parent menggunakan callback onValid
    onValid(formValues); // Callback ke parent untuk melanjutkan ke langkah berikutnya
  });

  // useEffect(() => {
  //   methods.reset({
  //     ...formData,
  //     patients: formData.patients || [],
  //   });
  // }, [formData, methods]);

  console.log(formData);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field.Text name="patients.patientName" label="Nama Pasien" sx={{ my: 3 }} />
      <Field.Text name="patients.patientPhone" label="No Hp Pasien" />
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
