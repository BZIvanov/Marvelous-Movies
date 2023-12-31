import { api } from './api';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        const orders = result?.orders || [];

        return [
          ...orders.map(({ _id }) => ({ type: 'Orders', id: _id })),
          { type: 'Orders', id: 'LIST' },
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
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    updateOrderStatus: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/orders/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (response, err, payload) => {
        return [{ type: 'Orders', id: payload.id }];
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
