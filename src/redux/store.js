import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartsSlice";
import brandReducer from "./slices/brandsSlice";
import colorReducer from "./slices/colorsSlice";
import couponReducer from "./slices/couponsSlice";
import productReducer from "./slices/productsSlice";
import categoryReducer from "./slices/categoriesSlice";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    carts: cartReducer,
    brands: brandReducer,
    colors: colorReducer,
    coupons: couponReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
