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
      }),
    };
  },
});

export const { useGetSellerShopQuery } = shopsApi;
