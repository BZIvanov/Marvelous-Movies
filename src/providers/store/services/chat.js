import { api } from './api';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChats: build.query({
      query: (params) => {
        return {
          url: '/chats',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.chats.map(({ _id }) => ({
            type: 'Chats',
            id: _id,
          })),
          { type: 'Chats', id: 'LIST' },
        ];
      },
    }),
    getChat: build.query({
      query: (data) => {
        const { receiverId, ...rest } = data;

        return {
          url: `/chats/${receiverId}`,
          method: 'GET',
          params: rest,
          credentials: 'include',
        };
      },
      providesTags: () => {
        return [{ type: 'Chat' }];
      },
    }),
    getChatMessages: build.query({
      query: (data) => {
        const { chatId, ...rest } = data;

        return {
          url: `/chats/${chatId}/messages`,
          method: 'GET',
          params: rest,
          credentials: 'include',
        };
      },
    }),
    createChat: build.mutation({
      query: (data) => {
        return {
          url: '/chats',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [{ type: 'Chats', id: 'LIST' }, { type: 'Chat' }];
      },
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetChatMessagesQuery,
  useCreateChatMutation,
} = chatApi;
