import { api } from './api';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params = {}) => {
        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
      providesTags: (result) => {
        return [
          ...result.products.map(({ _id }) => ({ type: 'Products', id: _id })),
          { type: 'Products', id: 'LIST' },
        ];
      },
    }),
    getSimilarProducts: build.query({
      query: (id) => {
        return {
          url: `/products/${id}/similar`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.products.map(({ _id }) => ({
            type: 'SimilarProducts',
            id: _id,
          })),
          { type: 'SimilarProducts', id: 'LIST' },
        ];
      },
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, payload) => {
        return [{ type: 'Products', id: payload }];
      },
    }),
    createProduct: build.mutation({
      query: (data) => {
        return {
          url: '/products',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [{ type: 'Products', id: 'LIST' }];
      },
    }),
    updateProduct: build.mutation({
      query: (data) => {
        const { id, formData } = data;

        return {
          url: `/products/${id}`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [{ type: 'Products', id: payload.id }];
      },
    }),
    deleteProduct: build.mutation({
      query(id) {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [{ type: 'Products', id: payload }];
      },
    }),
    getProductsBrands: build.query({
      query: () => {
        return {
          url: `/products/brands`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.brands.map((brand) => {
            return {
              type: 'ProductsBrands',
              id: brand,
            };
          }),
          { type: 'ProductsBrands', id: 'LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSimilarProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsBrandsQuery,
} = productsApi;
