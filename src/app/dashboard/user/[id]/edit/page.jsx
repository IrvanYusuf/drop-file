import EditUserPage from 'src/sections/dashboard/user/edit/EditUserPage';

const Page = ({ params }) => {
  const { id } = params;

  return <EditUserPage id={id} />;
};

export default Page;
