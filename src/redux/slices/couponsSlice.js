/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//Fetch Coupon Action
export const fetchCouponAction = createAsyncThunk(
  "coupons/single",
  async (code, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/coupons/single?code=${code}`,
        { code }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch Coupons Action
export const fetchCouponsAction = createAsyncThunk(
  "coupons/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Coupon Slices
const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //Fetch
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
    });
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.error = action.payload;
    });

    //Fetch All
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = null;
      state.error = action.payload;
    });

    // Reset Error Action
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });

    // Reset Success Action
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });
  },
});

// Generate Reducer
const couponReducer = couponsSlice.reducer;

export default couponReducer;
