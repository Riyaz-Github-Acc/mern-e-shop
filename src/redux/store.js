import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/usersSlice";
import productReducer from "./slices/productsSlice";
import categoryReducer from "./slices/categoriesSlice";
import brandReducer from "./slices/brandsSlice";
import colorReducer from "./slices/colorsSlice";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
