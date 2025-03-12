import { CONFIG } from 'src/config-global';
import { DetailProjectPage } from 'src/sections/dashboard/project/detail/DetailProjectPage';
export const metadata = { title: `Project Detail | Dashboard - ${CONFIG.appName}` };
const page = ({ params }) => {
  const { id } = params;
  return <DetailProjectPage id={id} />;
};

export default page;
