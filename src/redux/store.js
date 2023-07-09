import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartsSlice";
import brandReducer from "./slices/brandsSlice";
import colorReducer from "./slices/colorsSlice";
import orderReducer from "./slices/ordersSlice";
import searchReducer from "./slices/searchSlice";
import couponReducer from "./slices/couponsSlice";
import reviewReducer from "./slices/reviewsSlice";
import productReducer from "./slices/productsSlice";
import categoryReducer from "./slices/categoriesSlice";

// Create Store
const store = configureStore({
  reducer: {
    users: userReducer,
    carts: cartReducer,
    brands: brandReducer,
    colors: colorReducer,
    orders: orderReducer,
    search: searchReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
