import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';

import { useDispatch } from '@/providers/store/store';
import {
  useGetProductReviewsQuery,
  useReviewProductMutation,
  useGetProductReviewsSummaryQuery,
} from '@/providers/store/services/reviews';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import FormProvider from '@/providers/form/FormProvider';
import RatingFieldAdapter from '@/providers/form/formFields/RatingFieldAdapter';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import { formConfig } from './reviewForm.schema';

const perPage = 10;

const ProductReviews = ({ productId }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { data: reviewsData } = useGetProductReviewsQuery({
    productId,
    page,
    perPage,
  });
  const reviews = reviewsData?.reviews || [];

  const { data: reviewsSummaryData } =
    useGetProductReviewsSummaryQuery(productId);
  const reviewSummary = reviewsSummaryData?.review || {};

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [reviewProduct] = useReviewProductMutation();

  const form = useForm(formConfig);

  const handleReviewSubmit = async (values) => {
    const result = await reviewProduct({
      id: productId,
      ...values,
    });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Successfully rated with rating of ${values.rating} stars`,
        })
      );

      form.reset();
    }
  };

  const isLoading = useIsApiRequestPending();

  const pagesCount = Math.ceil(reviews.length / perPage);

  const ratings = reviewSummary?.ratings || {};
  const totalReviewCount = reviewSummary?.totalReviews || 0;

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <Typography variant='h4'>
              {reviewSummary.averageRating?.toFixed(1)}
            </Typography>
            <Typography variant='h6' sx={{ color: 'grey' }}>
              /5
            </Typography>
          </Box>
          <Rating
            name='average-rating'
            value={Number(reviewSummary.averageRating)}
            disabled={true}
            precision={1}
          />
          <Typography variant='body1' sx={{ color: 'grey' }}>
            {reviews.length} reviews
          </Typography>
        </Box>

        <Box display='flex' flexDirection='column'>
          {Object.keys(ratings)
            .reverse()
            .map((rating) => {
              const starReviewCount = ratings[rating].count;
              const barWidth =
                totalReviewCount === 0
                  ? 0
                  : (starReviewCount / totalReviewCount) * 100;

              return (
                <Box key={rating} display='flex' alignItems='center' gap={2}>
                  <Box sx={{ minWidth: '93px' }}>
                    <Rating
                      name={`rating-count-${rating}`}
                      value={Number(rating)}
                      disabled={true}
                      precision={1}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 200,
                      height: 14,
                      bgcolor: 'grey.300',
                      position: 'relative',
                    }}
                  >
                    <LinearProgress
                      variant='determinate'
                      value={barWidth}
                      sx={{
                        height: '100%',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#Edbb0E',
                        },
                      }}
                    />
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {starReviewCount}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>

      <Divider />

      <Box sx={{ mt: 2 }}>
        <Box>
          <Typography variant='h5' gutterBottom={true}>
            Product reviews ({reviews.length})
          </Typography>

          {reviews.map((review, index) => {
            return (
              <Box
                key={review._id}
                sx={{
                  padding: 1,
                  backgroundColor: index % 2 === 0 ? '#eeeeee' : 'white',
                }}
              >
                <Rating
                  name={`review-rating-${review._id}`}
                  value={review.rating}
                  disabled={true}
                  precision={1}
                />
                <Typography variant='subtitle2' gutterBottom={true}>
                  {review.user.username}
                </Typography>
                <Typography variant='body2'>{review.comment}</Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBlock: 1 }}>
          <Pagination
            count={pagesCount}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>

      <Divider />

      <Box sx={{ mt: 2 }}>
        <Typography variant='h5' gutterBottom={true}>
          Post a review
        </Typography>

        <FormProvider onSubmit={handleReviewSubmit} methods={form}>
          <RatingFieldAdapter name='rating' label='Your rating' />
          <TextFieldAdapter
            name='comment'
            label='Your comment'
            multiline={true}
          />

          <Button variant='contained' type='submit' disabled={isLoading}>
            Review
          </Button>
        </FormProvider>
      </Box>
    </Box>
  );
};

ProductReviews.propTypes = {
  productId: PropTypes.string,
};

export default ProductReviews;
