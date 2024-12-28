'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export function AuthGuard({ children, allowedRoles = [] }) {
  const router = useRouter();

  const { authenticated, loading, user } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = {
        jwt: paths.auth.signIn,
      }[method];

      const href = `${signInPath}`;

      router.replace(href);
      return;
    }

    // check role user
    if (!allowedRoles.includes(user)) {
      router.replace(paths.notAuthenticated);
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
