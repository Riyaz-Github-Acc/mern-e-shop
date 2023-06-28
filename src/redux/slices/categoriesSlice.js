/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// Fetch Categories Action
export const fetchCategoriesAction = createAsyncThunk(
  "categories/list",
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

// Category Slices
const categorySlices = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //Fetch All
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isAdded = true;
      state.loading = false;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.categories = null;
      state.isAdded = false;
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
const categoryReducer = categorySlices.reducer;

export default categoryReducer;
