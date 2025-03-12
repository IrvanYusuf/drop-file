'use client';
import { ProjectDetailContent } from 'src/sections/dashboard/project/detail/ProjectDetailContent';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { endpoints } from 'src/routes/endpoints';
import { Typography } from '@mui/material';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { toast } from 'src/components/snackbar';

const DetailClientProjectPage = ({ id }) => {
  const project = {
    projectContent: null,
    projectFiles: null,
    projectProducts: null,
    loadingFiles: false,
  };

  const { data: detailClientProject, isLoading } = useQuery(
    [`detail-client-project-${id}`],
    `${endpoints.project.root}/${id}`
  );

  const { data: detailClientProjectFiles, isLoading: isLoadingProjectFiles } = useQuery(
    [`detail-client-project-files-${id}`],
    `${endpoints.project.root}/project-files/${id}`
  );
  const { data: detailClientProjectProducts } = useQuery(
    [`detail-client-project-products-${id}`],
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

  let transformProjectProducts = [];

  if (detailClientProject && detailClientProjectFiles) {
    project.projectContent = detailClientProject[0];
    project.projectFiles = detailClientProjectFiles;
    project.loadingFiles = isLoadingProjectFiles;
  }

  if (detailClientProjectProducts) {
    for (const product of detailClientProjectProducts) {
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

  console.log(project);

  if (isLoading) {
    return <Typography>loading....</Typography>;
  }
  return (
    <ProjectDetailContent
      project={project && project}
      handleDownloadFiles={handleDownloadFiles}
      isShowButtonTakeProject={true}
    />
  );
  //   return 'halo';
};

export default DetailClientProjectPage;
