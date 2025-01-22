'use client';
import { useAuthContext } from 'src/auth/hooks';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { AccountGeneral } from 'src/sections/dashboard/user/detail/account-general';

const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <p>User is not logged in.</p>;
  }

  const { data: [dataDetailUser] = [], isLoading } = useQuery(
    [`detail-user-${user.user_id}`],
    `/api/v1/users/${user.user_id}`
  );

  console.log(user);
  console.log(dataDetailUser);

  return <AccountGeneral currentUser={dataDetailUser} />;
};

export default ProfilePage;
