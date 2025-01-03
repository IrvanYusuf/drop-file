'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';
import { paths } from 'src/routes/paths';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
  const router = useRouter();

  const { loading, authenticated, user } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      if (user.role !== 'ADMIN') {
        router.replace(paths.home);
      } else {
        router.replace(paths.dashboard.root);
      }
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
