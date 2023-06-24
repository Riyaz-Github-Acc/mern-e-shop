import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/usersSlice";

// Create Store
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
