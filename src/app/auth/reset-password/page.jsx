import React from 'react';
import ResetPasswordPage from 'src/auth/view/ResetPassword/ResetPasswordPage';
import { CONFIG } from 'src/config-global';

export const metadata = { title: `Reset Password | Auth - ${CONFIG.appName}` };
const page = () => {
  return <ResetPasswordPage />;
};

export default page;
