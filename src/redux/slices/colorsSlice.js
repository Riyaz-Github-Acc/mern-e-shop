/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// Fetch All color Action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// color Slices
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //Fetch All
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
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
const colorReducer = colorsSlice.reducer;

export default colorReducer;
