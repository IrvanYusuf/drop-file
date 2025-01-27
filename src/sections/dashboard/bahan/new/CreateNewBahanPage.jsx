import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import BahanNewForm from './BahanNewForm';

const CreateNewBahanPage = () => {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new bahan"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Bahan', href: paths.dashboard.bahan.root },
          { name: 'New bahan' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BahanNewForm />
    </DashboardContent>
  );
};

export default CreateNewBahanPage;
