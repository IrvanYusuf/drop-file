import { Container } from '@mui/material';
import ProjectAvailablePage from 'src/sections/client/projectAvailable/ProjectAvailablePage';

export const metadata = { title: `Dentaloka - Browse Project Page` };

const page = () => {
  return (
    <Container>
      <ProjectAvailablePage isBrowsePage={true} />
    </Container>
  );
};

export default page;
