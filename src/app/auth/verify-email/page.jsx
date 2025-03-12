import React from 'react';
import VerifyEmailPage from 'src/auth/view/verifyEmail/VerifyEmailPage';
import { CONFIG } from 'src/config-global';

export const metadata = { title: `Verify email | Auth - ${CONFIG.appName}` };
const page = () => {
  return <VerifyEmailPage />;
};

export default page;
