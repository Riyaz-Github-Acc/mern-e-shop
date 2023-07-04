import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
import OrderPayment from "./pages/payment/OrderPayment";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailed from "./pages/payment/PaymentFailed";
import AddReview from "./components/AddReview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
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
            path="/order-payment"
            element={
              <AuthRoute>
                <OrderPayment />
              </AuthRoute>
            }
          />

          <Route
            path="/add-review/:id"
            element={
              <AuthRoute>
                <AddReview />
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
        </Route>

        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/failed" element={<PaymentFailed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
