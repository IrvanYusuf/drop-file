import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import ProductNewForm from './ProductNewForm';
import { paths } from 'src/routes/paths';

const CreateNewProductPage = () => {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new product"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.root },
          { name: 'New Product' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewForm />
    </DashboardContent>
  );
};

export default CreateNewProductPage;
