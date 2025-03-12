import { Container } from '@mui/material';
import DetailClientProjectPage from 'src/sections/client/project/Detail/DetailClientProjectPage';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
const page = ({ params }) => {
  const { id } = params;
  return (
    <Container>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Detail a project"
          links={[
            { name: 'Home', href: paths.home },
            { name: 'Browse Projects', href: paths.browseProject.root },
            { name: 'Detail' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <DetailClientProjectPage id={id} />
      </DashboardContent>
    </Container>
  );
};

export default page;
