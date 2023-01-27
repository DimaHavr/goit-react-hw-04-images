import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ imagesArray, onToggleModal, onClickPictures }) => {
  return (
    <ImageGalleryList>
      {imagesArray.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          onClickPictures={onClickPictures}
          url={webformatURL}
          onToggleModal={onToggleModal}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  onClickPictures: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  imagesArray: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
