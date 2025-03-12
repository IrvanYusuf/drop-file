'use client';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import EditBahanForm from './EditBahanForm';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { endpoints } from 'src/routes/endpoints';

const EditBahanPage = ({ id }) => {
  const { data: [dataDetailBahan] = [], isLoading } = useQuery(
    [`edit-bahan-${id}`],
    `${endpoints.bahan.root}/${id}`
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  console.log('edit page', dataDetailBahan);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit a bahan"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Bahan', href: paths.dashboard.bahan.root },
          { name: `Edit bahan` },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EditBahanForm dataDetailBahan={dataDetailBahan} />
    </DashboardContent>
  );
};

export default EditBahanPage;
