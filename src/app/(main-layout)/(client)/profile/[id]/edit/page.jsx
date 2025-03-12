import { AuthGuard } from 'src/auth/guard';
import EditProfilePageClient from 'src/sections/client/profile/edit/EditProfilePageClient';

export const metadata = { title: `Dentaloka - Edit Profile Page` };
const page = ({ params }) => {
  const { id } = params;
  return (
    <AuthGuard allowedRoles={['ADMIN', 'CLIENT', 'WORKER']}>
      <EditProfilePageClient id={id} />
    </AuthGuard>
  );
};

export default page;
