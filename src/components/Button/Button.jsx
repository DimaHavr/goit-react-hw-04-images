import { Box } from 'components/Box';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <Box textAlign="center" paddingBottom="30px">
      <ButtonStyled onClick={onLoadMore} type="button">
        Load more
      </ButtonStyled>
    </Box>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
