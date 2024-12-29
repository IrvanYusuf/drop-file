'use client';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import UserNewForm from './UserNewForm';

const CreateNewUserPage = () => {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'New user' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewForm />
    </DashboardContent>
  );
};

export default CreateNewUserPage;
