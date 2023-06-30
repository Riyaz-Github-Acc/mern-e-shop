/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// Add Product to Cart
export const addOrderToCartAction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    // Push to Local Storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);

// Get Cart Items from Local Storage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    return cartItems;
  }
);

// Change Order Item Quantity
export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id?.toString() === productId?.toString()) {
        //Get New Price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

// Remove From Cart
export const removeOrderItemQty = createAsyncThunk(
  "cart/remove-order-item",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

// Cart Slices
const cartSlices = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    // Add To Cart
    builder.addCase(addOrderToCartAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.isAdded = true;
    });
    builder.addCase(addOrderToCartAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch Cart Items
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
  },
});

// Generate Reducer
const cartReducer = cartSlices.reducer;

export default cartReducer;
