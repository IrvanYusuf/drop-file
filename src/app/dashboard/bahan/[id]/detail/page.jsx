import DetailBahanPage from 'src/sections/dashboard/bahan/detail/DetailBahanPage';

const page = ({ params }) => {
  const { id } = params;
  return <DetailBahanPage id={id} />;
};

export default page;
