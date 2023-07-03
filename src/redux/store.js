import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartsSlice";
import brandReducer from "./slices/brandsSlice";
import colorReducer from "./slices/colorsSlice";
import orderReducer from "./slices/ordersSlice";
import couponReducer from "./slices/couponsSlice";
import reviewsReducer from "./slices/reviewsSlice";
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
    coupons: couponReducer,
    reviews: reviewsReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
