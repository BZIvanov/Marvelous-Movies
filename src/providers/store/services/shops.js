import { api } from './api';

export const shopsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getShops: build.query({
        query: (params = {}) => {
          return {
            url: '/shops',
            method: 'GET',
            credentials: 'include',
            params,
          };
        },
        providesTags: () => {
          return [{ type: 'Shops', id: 'PARTIAL-LIST' }];
        },
      }),
      // get shop by id for admin
      getShop: build.query({
        query: (id) => {
          return {
            url: `/shops/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
      // get shop for the currently logged in seller
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
  useGetShopsQuery,
  useGetShopQuery,
  useGetSellerShopQuery,
  useUpdateSellerShopInfoMutation,
  useUpdateSellerShopPayemntStatusMutation,
} = shopsApi;
