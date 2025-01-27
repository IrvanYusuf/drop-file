'use client';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';

const DetailProductPage = ({ id }) => {
  const { data: [dataDetailProduct] = [], isLoading } = useQuery(
    [`detail-product-${id}`],
    `/api/v1/products/${id}`
  );

  if (isLoading) {
    return <Typography>loading....</Typography>;
  }
  console.log(dataDetailProduct);

  return (
    <DashboardContent sx={{ mt: 7 }}>
      <CustomBreadcrumbs
        heading="Product"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: `Products`, href: paths.dashboard.product.root },
          { name: 'Detail' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Box>
            <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Product Name</Box>
            <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
              {dataDetailProduct?.name}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Bahan</Box>
            <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
              {dataDetailProduct?.bahan}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Price</Box>
            <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
              {FormatCurrencyRupiah.format(dataDetailProduct.price)}
            </Typography>
          </Box>
        </Box>
      </Card>
    </DashboardContent>
  );
};

export default DetailProductPage;
