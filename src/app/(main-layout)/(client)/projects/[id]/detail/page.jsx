import DetailClientProjectPage from 'src/sections/client/project/Detail/DetailClientProjectPage';

export const metadata = { title: `Dentaloka - Detail Project Page` };
const page = ({ params }) => {
  const { id } = params;
  return <DetailClientProjectPage id={id} />;
};

export default page;
