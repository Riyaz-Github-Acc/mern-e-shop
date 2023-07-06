import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserProfileAction,
  updateUserShippingAddressAction,
} from "../redux/slices/usersSlice";

import Button from "./Button";
import ErrorMsg from "./messages/ErrorMsg";
import SpinLoading from "./loaders/SpinLoading";
import { DeliveryDiningOutlined } from "@mui/icons-material";
import Container from "./Container";
import { Link } from "react-router-dom";

const EditShippingAddress = () => {
  //dispatch
  const dispatch = useDispatch();

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.user;

  const [formData, setFormData] = useState({
    firstName: user?.shippingAddress?.firstName,
    lastName: user?.shippingAddress?.lastName,
    address: user?.shippingAddress?.address,
    city: user?.shippingAddress?.city,
    postalCode: user?.shippingAddress?.postalCode,
    state: user?.shippingAddress?.state,
    country: user?.shippingAddress?.country,
    phone: user?.shippingAddress?.phone,
  });

  //onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserShippingAddressAction(formData));

    // Redirect
    // window.location.href = "/shopping-cart";
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {/* shipping details */}
      {loading ? (
        <SpinLoading />
      ) : (
        user?.hasShippingAddress && (
          <Container>
            <form
              onSubmit={onSubmit}
              className="mt-14 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-20"
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    onChange={onChange}
                    value={formData?.firstName}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    onChange={onChange}
                    value={formData?.lastName}
                    className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    onChange={onChange}
                    value={formData?.address}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    onChange={onChange}
                    value={formData?.city}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="state"
                    onChange={onChange}
                    value={formData?.state}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="postalCode"
                    onChange={onChange}
                    value={formData?.postalCode}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    onChange={onChange}
                    value={formData?.country}
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      --Select Country--
                    </option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={onChange}
                    value={formData?.phone}
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button type="primaryBtn">
                  <span className="flex flex-row items-center justify-center gap-3">
                    <DeliveryDiningOutlined fontSize="medium" />
                    Upate Shipping Address
                  </span>
                </Button>

                <div className="text-sky-600 hover:text-sky-800 underline">
                  <Link to="/shopping-cart">Go to Shopping Cart</Link>
                </div>
              </div>
            </form>
          </Container>
        )
      )}
    </>
  );
};

export default EditShippingAddress;
