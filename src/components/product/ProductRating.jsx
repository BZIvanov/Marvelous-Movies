import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { MAX_RATING_VALUE } from './constants';

const ProductRating = ({ rating, reviews, size = 'large' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: 0.5, md: 1 },
        paddingBottom: { xs: 0.5, md: 1 },
      }}
    >
      {rating > 0 ? (
        <>
          <Rating
            value={rating}
            precision={1}
            size={size}
            max={MAX_RATING_VALUE}
            disabled={true}
          />
          <Typography variant='body2' ml={1}>
            ({reviews})
          </Typography>
        </>
      ) : (
        <Typography variant='body2'>Not rated yet</Typography>
      )}
    </Box>
  );
};

ProductRating.propTypes = {
  rating: PropTypes.number,
  reviews: PropTypes.number,
  size: PropTypes.string,
};

export default ProductRating;
