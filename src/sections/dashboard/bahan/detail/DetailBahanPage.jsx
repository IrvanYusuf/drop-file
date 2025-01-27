'use client';
import { Box, Card, Typography } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

const DetailBahanPage = ({ id }) => {
  const { data: [dataDetailBahan] = [], isLoading } = useQuery(
    [`detail-bahan-${id}`],
    `/api/v1/bahan/${id}`
  );

  console.log(dataDetailBahan);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <DashboardContent sx={{ mt: 7 }}>
      <CustomBreadcrumbs
        heading="Bahan"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: `Bahan`, href: paths.dashboard.bahan.root },
          { name: 'Detail' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card sx={{ p: 3 }}>
        <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Bahan</Box>
        <Typography sx={{ typography: 'subtitle1', mt: 1 }}>{dataDetailBahan?.bahan}</Typography>
      </Card>
    </DashboardContent>
  );
};

export default DetailBahanPage;
