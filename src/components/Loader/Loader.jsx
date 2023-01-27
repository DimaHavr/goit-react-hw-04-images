import { ThreeDots } from 'react-loader-spinner';
import { LoaderIcon } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderIcon>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderIcon>
  );
};

export default Loader;
