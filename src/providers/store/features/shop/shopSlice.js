import { createSlice } from '@reduxjs/toolkit';

import { shopsApi } from '../../services/shops';

const initialState = {
  shop: null,
  initialLoadingCompleted: false,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      shopsApi.endpoints.getSellerShop.matchFulfilled,
      (state, action) => {
        state.shop = action.payload.shop;
        state.initialLoadingCompleted = true;
      }
    );
  },
});

export default shopSlice.reducer;

export const selectShop = (state) => state.shop.shop;
export const selectShopInitialLoadingCompleted = (state) =>
  state.shop.initialLoadingCompleted;
