import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      register: build.mutation({
        query: (data) => {
          return {
            url: '/users/register',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        providesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      login: build.mutation({
        query: (data) => {
          return {
            url: '/users/login',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        providesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      logout: build.mutation({
        query: () => {
          return {
            url: '/users/logout',
            method: 'POST',
            credentials: 'include',
          };
        },
      }),
      getCurrentUser: build.query({
        query: () => {
          return {
            url: '/users/current-user',
            method: 'GET',
            credentials: 'include', // this is needed for the cookies to be set and sent to the backend
          };
        },
        providesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      forgotPassword: build.mutation({
        query: (data) => {
          return {
            url: '/users/forgot-password',
            method: 'POST',
            body: data,
          };
        },
      }),
      resetPassword: build.mutation({
        query: (data) => {
          return {
            url: '/users/reset-password',
            method: 'POST',
            body: data,
          };
        },
      }),
      updatePassword: build.mutation({
        query: (data) => {
          return {
            url: '/users/update-password',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
      }),
      updateAvatar: build.mutation({
        query: (data) => {
          return {
            url: '/users/update-avatar',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' }];
        },
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = usersApi;
