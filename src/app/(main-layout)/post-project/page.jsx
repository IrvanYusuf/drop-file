import { CONFIG } from 'src/config-global';
import PostProjectSection from 'src/sections/project/PostProjectSection';
export const metadata = { title: `Create Project | Project - ${CONFIG.appName}` };
const page = () => {
  return <PostProjectSection />;
};

export default page;
