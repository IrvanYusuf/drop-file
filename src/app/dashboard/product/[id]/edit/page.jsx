import { CONFIG } from 'src/config-global';
import EditProductPage from 'src/sections/dashboard/product/edit/EditProductPage';

export const metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };
const page = ({ params }) => {
  const { id } = params;
  return <EditProductPage id={id} />;
};

export default page;
