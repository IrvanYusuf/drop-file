import DetailUserPage from 'src/sections/dashboard/user/detail/DetailUserPage';

const Page = ({ params }) => {
  const { id } = params;
  return <DetailUserPage id={id} />;
};

export default Page;
