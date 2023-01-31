import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchPictures from '../services/picturesApi';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreButton from './LoadMoreButton';
import Modal from './Modal';
import SearchBar from './SearchBar';
import Box from 'components/Box';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesArray, setImagesArray] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [preLoader, setPreLoader] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAndUpdatePictures = async () => {
      setPreLoader(true);
      try {
        const imagesArray = await fetchPictures(query, page);
        setTotalHits(imagesArray.totalHits);
        if (imagesArray.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no pictures matching your search query. Please try again'
          );
          return;
        }
        setImagesArray(prevImagesArray => [
          ...prevImagesArray,
          ...imagesArray.hits.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })),
        ]);
        setPreLoader(false);
      } catch (error) {
        console.log(error);
      } finally {
        setPreLoader(false);
      }
    };

    if (!query) {
      return;
    }
    fetchAndUpdatePictures();
  }, [query, page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickPictures = event => {
    setLargeImageURL(
      imagesArray.find(item => item.webformatURL === event.target.src)
        .largeImageURL
    );
  };

  const handleInputSubmit = value => {
    setQuery(value);
    setPage(1);
    setImagesArray([]);
    setTotalHits(0);
  };

  const ImagesArrLength = imagesArray.length;
  const showImagesGallery = ImagesArrLength > 0;
  const showEndText = ImagesArrLength === totalHits && ImagesArrLength > 0;
  const showLoadMoreBtn = ImagesArrLength !== totalHits;

  return (
    <>
      <SearchBar onSubmit={handleInputSubmit} />
      <Box as="main">
        <Box as="section">
          {showImagesGallery && (
            <ImageGallery
              onClickPictures={onClickPictures}
              imagesArray={imagesArray}
              onToggleModal={onToggleModal}
            />
          )}
          {preLoader && <Loader />}
          {!showLoadMoreBtn && showEndText && (
            <Box as="p" textAlign="center" fontWeight="700">
              The end
            </Box>
          )}
          {!preLoader && showLoadMoreBtn && (
            <LoadMoreButton onLoadMore={onLoadMore} />
          )}
        </Box>
      </Box>
      {showModal && <Modal onToggleModal={onToggleModal} img={largeImageURL} />}
    </>
  );
};

export default App;
