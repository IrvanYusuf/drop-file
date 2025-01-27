import { CONFIG } from 'src/config-global';
import ProductListPage from 'src/sections/dashboard/product/ProductListPage';
export const metadata = { title: `Product List | Dashboard - ${CONFIG.appName}` };
const page = () => {
  return <ProductListPage />;
};

export default page;
