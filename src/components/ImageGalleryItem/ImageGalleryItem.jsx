import PropTypes from 'prop-types';
import {
  ImageGalleryItemImg,
  ImageGalleryListItem,
} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ url, onToggleModal, onClickPictures }) => (
  <ImageGalleryListItem onClick={onToggleModal}>
    <ImageGalleryItemImg onClick={onClickPictures} src={url} alt="" />
  </ImageGalleryListItem>
);

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  onClickPictures: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
