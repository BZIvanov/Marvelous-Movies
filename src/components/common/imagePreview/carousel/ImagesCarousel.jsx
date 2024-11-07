import PropTypes from 'prop-types';

import Carousel from './Carousel';

const ImagesCarousel = ({ images = [] }) => {
  return (
    <Carousel>
      {images.length > 0 ? (
        images.map(({ publicId, imageUrl }) => (
          <img src={imageUrl} key={publicId} alt='product-preview' />
        ))
      ) : (
        <img src='/images/product.png' alt='product-preview' />
      )}
    </Carousel>
  );
};

ImagesCarousel.propTypes = {
  images: PropTypes.array,
};

export default ImagesCarousel;
