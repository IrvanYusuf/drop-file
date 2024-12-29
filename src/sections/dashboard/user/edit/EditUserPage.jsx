'use client';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import UserEditForm from './UserEditForm';

const EditUserPage = ({ id }) => {
  const { data: [dataEditUser] = [], isLoading } = useQuery(
    [`edit-user-dashboard-${id}`],
    `/api/v1/users/${id}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContent sx={{ mt: 7 }}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <UserEditForm currentUser={dataEditUser} />
    </DashboardContent>
  );
};

export default EditUserPage;
