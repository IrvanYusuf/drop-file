'use client';

import { useQuery } from 'src/hooks/fetch-custom/use-query';
import UserEditForm from 'src/sections/dashboard/user/edit/UserEditForm';

const EditProfilePageClient = ({ id }) => {
  const { data: [dataEditUser] = [], isLoading } = useQuery(
    [`edit-user-client-${id}`],
    `/api/v1/users/${id}`
  );

  return <UserEditForm currentUser={dataEditUser && dataEditUser} />;
};

export default EditProfilePageClient;
