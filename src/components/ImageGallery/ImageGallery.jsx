import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
export const ImageGallery = ({
  imagesArray,
  onToggleModal,
  onClickPictures,
}) => {
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
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
