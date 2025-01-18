import { AuthGuard } from 'src/auth/guard';
import ClientLayout from 'src/layouts/client/layout';

const Layout = ({ children }) => (
  //   <AuthGuard allowedRoles={['USER']}>
  <ClientLayout children={children} />
  //   </AuthGuard>
);

export default Layout;
