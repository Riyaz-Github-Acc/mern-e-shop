/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Initial State
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},

  userAuth: {
    userInfo: localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null,
    loading: false,
    error: null,
  },
};

// Register Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userName, email, password, file } = payload;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // FormData
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", file);

      // Make http request
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      // Save the User in Local Storage
      localStorage.setItem("userToken", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Logout Action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  // Remove Token
  localStorage.removeItem("userToken");
  localStorage.removeItem("cartItems");
  return true;
});

// Update User Shipping Address Action
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    { firstName, lastName, address, city, postalCode, state, country, phone },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          state,
          country,
          phone,
        },
        config
      );

      // Reload the page after successful address update
      window.location.reload();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/profile-fetched",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update User Action
export const updateUserAction = createAsyncThunk(
  "users/update-user",
  async (
    { userName, email, file, id },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      };

      // FormData
      // const formData = new FormData();
      // formData.append("userName", userName);
      // formData.append("email", email);
      // if (file) {
      //   formData.append("file", file);
      // }

      // Make http request
      const { data } = await axios.put(
        `${baseURL}/users/update/${id}`,
        { userName, email },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Users Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // Logout
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });

    // Shipping Address
    builder.addCase(
      updateUserShippingAddressAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    // Profile
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Update User
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
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
const usersReducer = usersSlice.reducer;

export default usersReducer;
