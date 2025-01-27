import { useState } from 'react';
import ProjectStepper from './stepperProject/ProjectStepper';
import ProductStepper from './stepperProject/ProductStepper';
import PatientStepper from './stepperProject/PatientStepper';
import PaymentStepper from './stepperProject/PaymentStepper';
import { Box, Button, Divider, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import FormOauth from 'src/auth/view/FormOAuth/FormOAuth';

const steps = ['Projek', 'Produk', 'Pasien', 'Pembayaran'];
const PostProjectForm = ({ formData, setFormData, files }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuthContext();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSubmitProject = (data) => {
    setFormData(data); // Menyimpan data form di state
    handleNext(); // Lanjutkan ke langkah berikutnya
  };

  const stepContent = [
    <ProjectStepper onValid={handleSubmitProject} formData={formData} />,
    <ProductStepper handleBack={handleBack} onValid={handleSubmitProject} formData={formData} />,
    <PatientStepper handleBack={handleBack} onValid={handleSubmitProject} formData={formData} />,
    <PaymentStepper
      handleBack={handleBack}
      onValid={handleSubmitProject}
      formData={formData}
      files={files}
    />,
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {!user && <FormOauth showOr={false} />}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
    </Box>
  );
};

export default PostProjectForm;
