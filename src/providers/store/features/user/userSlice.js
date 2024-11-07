import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '../../services/users';

const initialState = {
  user: null,
  initialLoadingCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.initialLoadingCompleted = true;
        }
      )
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.initialLoadingCompleted = true;
      })
      .addMatcher(usersApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        usersApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.initialLoadingCompleted = true;
        }
      )
      .addMatcher(usersApi.endpoints.getCurrentUser.matchRejected, (state) => {
        state.user = null;
        state.initialLoadingCompleted = true;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
export const selectUserInitialLoadingCompleted = (state) =>
  state.user.initialLoadingCompleted;
