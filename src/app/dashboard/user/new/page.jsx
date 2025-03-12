import React from 'react';
import { CONFIG } from 'src/config-global';
import CreateNewUserPage from 'src/sections/dashboard/user/new/CreateNewUserPage';
export const metadata = { title: `User Create | Dashboard - ${CONFIG.appName}` };
const page = () => {
  return <CreateNewUserPage />;
};

export default page;
