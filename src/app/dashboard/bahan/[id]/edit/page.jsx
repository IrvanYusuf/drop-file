import EditBahanPage from 'src/sections/dashboard/bahan/edit/EditBahanPage';

const page = ({ params }) => {
  const { id } = params;

  return <EditBahanPage id={id} />;
};

export default page;
