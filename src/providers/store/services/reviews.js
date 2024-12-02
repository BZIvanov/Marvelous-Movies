import { api } from './api';

export const reviewsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getProductReviews: build.query({
        query: (data) => {
          const { productId, ...rest } = data;

          return {
            url: `/reviews/${productId}`,
            method: 'GET',
            params: rest,
          };
        },
        providesTags: (result) => {
          return [
            ...result.reviews.map(({ _id }) => ({
              type: 'Reviews',
              id: _id,
            })),
            { type: 'Reviews', id: 'PARTIAL-LIST' },
          ];
        },
      }),
      getMyProductReview: build.query({
        query: (productId) => {
          return {
            url: `/reviews/${productId}/my-review`,
            method: 'GET',
            credentials: 'include',
          };
        },
        providesTags: () => {
          return [{ type: 'MyReview' }];
        },
      }),
      reviewProduct: build.mutation({
        query: (data) => {
          const { id, ...body } = data;

          return {
            url: `/reviews/${id}`,
            method: 'POST',
            body,
            credentials: 'include',
          };
        },
        invalidatesTags: (result) => {
          return [
            { type: 'Reviews', id: result.review._id },
            { type: 'ReviewsSummary' },
            { type: 'MyReview' },
            { type: 'Products', id: result.review.product },
          ];
        },
      }),
      getProductReviewsSummary: build.query({
        query: (productId) => {
          return {
            url: `/reviews/${productId}/summary`,
            method: 'GET',
          };
        },
        providesTags: () => {
          return [{ type: 'ReviewsSummary' }];
        },
      }),
    };
  },
});

export const {
  useGetProductReviewsQuery,
  useGetMyProductReviewQuery,
  useReviewProductMutation,
  useGetProductReviewsSummaryQuery,
} = reviewsApi;
