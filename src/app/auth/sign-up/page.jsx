import { CONFIG } from 'src/config-global';

import SignUpPage from 'src/auth/view/SignUp/SignUpPage';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SignUpPage />;
}
