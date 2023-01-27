import Box from 'components/Box';
import PropTypes from 'prop-types';
import { ButtonStyled } from './LoadMoreButton.styled';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <Box textAlign="center" paddingBottom="30px">
      <ButtonStyled onClick={onLoadMore} type="button">
        Load more
      </ButtonStyled>
    </Box>
  );
};

LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
