/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  products: [],
  product: {},
  search: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// Fetch Product action
export const fetchProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Products Action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${url}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Search Action
export const fetchSearchAction = createAsyncThunk(
  "product/search",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${url}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Product Slices
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.product = null;
      state.error = action.payload;
      state.loading = false;
    });

    // Fetch All
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.products = null;
      state.error = action.payload;
      state.loading = false;
    });

    // Fetch Search Results
    builder.addCase(fetchSearchAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchAction.fulfilled, (state, action) => {
      state.search = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSearchAction.rejected, (state, action) => {
      state.search = null;
      state.error = action.payload;
      state.loading = false;
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
const productReducer = productsSlice.reducer;

export default productReducer;
