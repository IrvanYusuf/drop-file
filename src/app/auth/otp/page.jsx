import React from 'react';
import VerifyOtpPage from 'src/auth/view/otp/VerifyOtpPage';
import { CONFIG } from 'src/config-global';

export const metadata = { title: `Verify OTP | Auth - ${CONFIG.appName}` };
const page = () => {
  return <VerifyOtpPage />;
};

export default page;
