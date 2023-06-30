import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./layout/header/Header";
import AuthRoute from "./components/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Product from "./pages/products/Product";
import Footer from "./layout/footer/Footer";
import Shop from "./pages/Shop";
import ProductsFilters from "./pages/products/ProductsFilters";
import ShoppingCart from "./pages/ShoppingCart";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products-filters" element={<ProductsFilters />} />

        <Route
          path="/shopping-cart"
          element={
            <AuthRoute>
              <ShoppingCart />
            </AuthRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
