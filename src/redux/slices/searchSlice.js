/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  search: [],
  loading: false,
  error: null,
};

// Fetch Search Action
export const fetchSearchAction = createAsyncThunk(
  "products/search",
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

// Search Slices
const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
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
const searchReducer = searchSlice.reducer;

export default searchReducer;
