import React from 'react';
import { MainLayout } from 'src/layouts/main';

const layout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default layout;
