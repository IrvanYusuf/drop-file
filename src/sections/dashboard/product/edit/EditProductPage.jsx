'use client';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import EditProductForm from './EditProductForm';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { Typography } from '@mui/material';

const EditProductPage = ({ id }) => {
  const { data: [dataEditProduct] = [], isLoading } = useQuery(
    [`edit-product-${id}`],
    `/api/v1/products/${id}`
  );

  if (isLoading) {
    return <Typography>loading....</Typography>;
  }

  console.log(id);
  console.log(dataEditProduct);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit a product"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.root },
          { name: 'Edit Product' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EditProductForm dataEditProduct={dataEditProduct} />
    </DashboardContent>
  );
};

export default EditProductPage;
