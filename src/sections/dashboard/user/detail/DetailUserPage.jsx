'use client';

import { useEffect, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { AccountGeneral } from './account-general';

const DetailUserPage = ({ id }) => {
  const { data: [dataDetailUser] = [], isLoading } = useQuery(
    [`detail-user-dashboard-${id}`],
    `/api/v1/users/${id}`
  );

  return (
    <DashboardContent sx={{ mt: 7 }}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: `User`, href: paths.dashboard.user.root },
          { name: 'Account' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <AccountGeneral currentUser={dataDetailUser} />
    </DashboardContent>
  );
};

export default DetailUserPage;
