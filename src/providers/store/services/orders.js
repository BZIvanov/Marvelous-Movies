import { api } from './api';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBuyerOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({ type: 'BuyerOrders', id: _id })),
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getAdminOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/admin',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({ type: 'AdminOrders', id: _id })),
          { type: 'AdminOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getSellerOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/seller',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({
            type: 'SellerOrders',
            id: _id,
          })),
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: () => {
        return [
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    updateOrderDeliveryStatus: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/orders/seller/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getBuyerOrdersStats: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/stats',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
    }),
    getSellerOrdersStats: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/seller/stats',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useGetBuyerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetSellerOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderDeliveryStatusMutation,
  useGetBuyerOrdersStatsQuery,
  useGetSellerOrdersStatsQuery,
} = ordersApi;
