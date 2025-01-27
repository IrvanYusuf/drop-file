import DetailProductPage from 'src/sections/dashboard/product/detail/DetailProductPage';

const page = ({ params }) => {
  const { id } = params;
  return <DetailProductPage id={id} />;
};

export default page;
