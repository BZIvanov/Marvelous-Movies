import { api } from './api';

export const shopsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getSellerShop: build.query({
        query: () => {
          return {
            url: '/shops/seller',
            method: 'GET',
            credentials: 'include',
          };
        },
        providesTags: () => {
          return [{ type: 'SellerShop' }];
        },
      }),
      updateSellerShopInfo: build.mutation({
        query: (data) => {
          return {
            url: '/shops/seller',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'SellerShop' }];
        },
      }),
      updateSellerShopPayemntStatus: build.mutation({
        query: (data) => {
          return {
            url: '/shops/seller/payment',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'SellerShop' }];
        },
      }),
    };
  },
});

export const {
  useGetSellerShopQuery,
  useUpdateSellerShopInfoMutation,
  useUpdateSellerShopPayemntStatusMutation,
} = shopsApi;
