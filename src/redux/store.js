import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/usersSlice";
import productReducer from "./slices/productsSlice";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
  },
});

export default store;
