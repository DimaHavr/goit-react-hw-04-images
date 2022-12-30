import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PicturesApiService from './services/picturesApi';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import { SearchBar } from './SearchBar';
import { Box } from 'components/Box';

const picturesApiService = new PicturesApiService();

export default function App() {
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onFetchPictures = async () => {
    setIsLoading(true);

    try {
      const imagesArray = await picturesApiService.fetchPictures();

      if (imagesArray.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      setImagesArray(
        imagesArray.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }))
      );
      Notify.success(`${imagesArray.totalHits} images found`);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!imagesName) {
      return;
    }

    picturesApiService.query = imagesName;
    setImagesArray([]);
    onFetchPictures();
  }, [imagesName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    onLoadPictures();
  }, [page]);

  const onLoadPictures = async () => {
    setIsLoading(true);

    try {
      const imagesArray = await picturesApiService.fetchPictures();
      setImagesArray(prevImagesArray => [
        ...prevImagesArray,
        ...imagesArray.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })),
      ]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    picturesApiService.clearPage();
    setImagesName(value);
    setPage(1);
    setImagesArray([]);
  };

  const ImagesArrLength = imagesArray.length;
  const totalPicturesPage = page * 12;

  return (
    <>
      <SearchBar onSubmit={handleInputSubmit} />
      <Box as="main">
        <Box as="section">
          <ImageGallery
            onClickPictures={onClickPictures}
            imagesArray={imagesArray}
            onToggleModal={onToggleModal}
          />
          {isLoading && <Loader />}
          {ImagesArrLength === totalPicturesPage ? (
            ImagesArrLength >= 12 && <Button onLoadMore={onLoadMore} />
          ) : ImagesArrLength === 0 ? (
            ''
          ) : (
            <Box as="p" textAlign="center" fontWeight="700">
              The end
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {imagesName.toLocaleLowerCase() === 'oleh hrek' && (
          <img
            src="https://www.meme-arsenal.com/memes/2b267f8453e2a454e51faadedb5346ea.jpg"
            alt=""
          />
        )}
      </Box>

      {error && Notify.failure('Error loading')}
      {showModal && <Modal onToggleModal={onToggleModal} img={largeImageURL} />}
    </>
  );
}
