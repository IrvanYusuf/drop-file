import { CONFIG } from 'src/config-global';
import ProjectListPage from 'src/sections/dashboard/project/ProjectListPage';
export const metadata = { title: `Projek List | Dashboard - ${CONFIG.appName}` };
const page = () => {
  return <ProjectListPage />;
};

export default page;
