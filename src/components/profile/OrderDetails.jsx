/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SpinLoading from "../loaders/SpinLoading";
import NoDataFound from "../messages/NoDataFound";

import { getUserProfileAction } from "../../redux/slices/usersSlice";

export default function OrderDetails() {
  // Get User Profile from Store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  // Get Data from Store
  const { profile, loading, error } = useSelector((state) => state?.users);

  // Get Orders
  const orders = profile?.user?.orders;

  return (
    <main>
      {loading ? (
        <SpinLoading />
      ) : error ? (
        "Something went wrong!"
      ) : orders?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <>
          <h1 className="text-xl font-semibold">Order Details</h1>
          {orders?.map((order) => (
            <div key={order?._id} className="whitespace-nowrap">
              <h2 className="text-lg font-semibold mt-10">
                Order Number{" "}
                <span className="text-red-500">#{order?.orderNumber}</span>
              </h2>

              <div className="flex flex-col sm:flex-row justify-between gap-5 text-light-black my-5">
                <div className="bg-light-white-opacity w-full px-5 py-5 rounded-lg shadow-md">
                  <div className="text-lg font-medium pb-3 border-b border-gray-300">
                    Items Summary
                  </div>

                  {order?.orderItems?.map((item) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-between gap-3 text-sm border-b border-gray-300 px-5 md:px-10"
                    >
                      <div className="flex items-center gap-3 my-2">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>{item?.name}</div>
                      </div>

                      <div>x{item?.qty}</div>
                      <div>₹{item?.price}</div>
                      <div>₹{item?.totalPrice}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-5 text-light-black">
                <div className="bg-light-white-opacity w-full h-[100%] px-5 py-5 rounded-lg shadow-md">
                  <div className="flex justify-between pb-4">
                    <div className="text-lg font-medium">Order Summary</div>
                    <div
                      className={`border ${
                        order?.status === "pending" &&
                        "border-yellow-600 text-yellow-600"
                      } ${
                        order?.status === "shipping" &&
                        "border-sky-600 text-sky-600"
                      } ${
                        order?.status === "delivered" &&
                        "border-green-700 text-green-700"
                      } ${
                        order?.status === "cancelled" &&
                        "border-red-500 text-red-500"
                      } text-sm capitalize rounded-full py-1 px-3`}
                    >
                      {order?.status}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Order Created</span>
                      {new Date(order?.createdAt).toDateString()}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Order Time</span>
                      {new Date(order?.createdAt).toLocaleTimeString()}
                    </div>

                    {/* <div className="flex justify-between">
                      <span className="font-medium">Discount</span>
                      {order?.discount
                        ? -(order?.discount).toFixed(2)
                        : "- ₹0.00"}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal</span> ₹
                      {order?.orderItems
                        ?.reduce((acc, item) => acc + item?.totalPrice, 0)
                        .toFixed(2)}
                    </div> */}

                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>₹
                      {order?.totalPrice.toFixed(2)}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Payment Status</span>
                      {order?.paymentStatus}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Payment Method</span>
                      {order?.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="bg-light-white-opacity w-full h-[100%] px-5 py-5 rounded-lg shadow-md">
                  <div className="text-lg font-medium pb-4">
                    Delivery Address
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Full Name</span>
                      {order?.shippingAddress?.firstName}{" "}
                      {order?.shippingAddress?.lastName}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Phone Number</span>
                      {order?.shippingAddress?.phone}
                    </div>

                    <div className="flex justify-between gap-2 whitespace-normal">
                      <span className="font-medium">Address</span>
                      <span className="text-right">
                        {order?.shippingAddress?.address}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">City</span>
                      {order?.shippingAddress?.city}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Postal Code</span>
                      {order?.shippingAddress?.postalCode}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">State</span>
                      {order?.shippingAddress?.state}
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Country</span>
                      {order?.shippingAddress?.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
