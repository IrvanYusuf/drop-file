import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard allowedRoles={['ADMIN']}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
