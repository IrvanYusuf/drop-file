'use client';

import { DashboardContent } from 'src/layouts/dashboard';

import { ProjectDetailContent } from './ProjectDetailContent';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { endpoints } from 'src/routes/endpoints';
import { Typography } from '@mui/material';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { toast } from 'src/components/snackbar';
// ----------------------------------------------------------------------

export function DetailProjectPage({ id }) {
  const project = {
    projectContent: null,
    projectFiles: null,
    projectProducts: null,
    loadingFiles: false,
  };

  const { data: detailProject, isLoading } = useQuery(
    [`detail-project-${id}`],
    `${endpoints.project.root}/${id}`
  );

  const { data: detailProjectFiles, isLoading: isLoadingProjectFiles } = useQuery(
    [`detail-project-files-${id}`],
    `${endpoints.project.root}/project-files/${id}`
  );
  const { data: detailProjectProducts } = useQuery(
    [`detail-project-products-${id}`],
    `${endpoints.project.root}/project-products/${id}`
  );

  const { mutate: downloadFiles } = useMutation(
    'POST',
    `${endpoints.project.root}/donwload-files/${id}`,
    {
      onSuccess: () => {
        toast.success('Download Files success!');
        console.log('download');
      },
    }
  );

  const handleDownloadFiles = () => downloadFiles();
  console.log(detailProjectProducts);

  let transformProjectProducts = [];

  if (detailProject && detailProjectFiles) {
    project.projectContent = detailProject[0];
    project.projectFiles = detailProjectFiles;
    project.loadingFiles = isLoadingProjectFiles;
  }

  if (detailProjectProducts) {
    for (const product of detailProjectProducts) {
      let existingProduct = transformProjectProducts.find(
        (p) => p.product_id === product.product_id
      );

      if (existingProduct) {
        existingProduct.positions.push(product.position);
      } else {
        transformProjectProducts.push({
          product_id: product.product_id,
          name: product.name,
          color: product.name,
          price: product.price,
          bahan: product.bahan,
          positions: [product.position],
        });
      }
    }
  }

  project.projectProducts = transformProjectProducts;

  if (isLoading) {
    return <Typography>loading....</Typography>;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Detail a project"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Project', href: paths.dashboard.projek.root },
          { name: 'Detail' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProjectDetailContent project={project} handleDownloadFiles={handleDownloadFiles} />
    </DashboardContent>
  );
}
