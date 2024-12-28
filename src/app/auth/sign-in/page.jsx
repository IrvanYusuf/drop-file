import SignInPage from 'src/auth/view/SignIn/SignInPage';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SignInPage />;
}
