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

  // Calculating Subtotal
  let sumSubtotalPrice = 0;

  orders?.forEach((order) => {
    const orderSubTotal = order?.orderItems?.reduce(
      (acc, item) => acc + item?.totalPrice,
      0
    );
    sumSubtotalPrice += orderSubTotal;
  });

  return (
    <main>
      {loading ? (
        <SpinLoading />
      ) : error ? (
        "Something went wrong!"
      ) : orders?.length <= 0 ? (
        <NoDataFound />
      ) : (
        orders?.map((order) => (
          <div key={order?._id}>
            <h2 className="text-lg font-semibold">
              Order Number{" "}
              <span className="text-red-500">#{order?.orderNumber}</span>
            </h2>

            <div className="text-light-black bg-light-white-opacity w-full my-5 px-10 py-5 rounded-lg shadow-md">
              <div className="text-black text-lg font-medium pb-3 border-b border-gray-300">
                Items Summary
              </div>

              {order?.orderItems?.map((item) => (
                <div
                  key={item?._id}
                  className="flex items-center justify-between gap-3 text-sm border-b border-gray-300"
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

            <div className="flex flex-row justify-between gap-5 text-light text-black-black">
              <div className="bg-light-white-opacity w-full h-[100%] px-5 py-5 rounded-lg shadow-md">
                <div className="text-black text-lg font-medium pb-5">
                  Order Summary
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">
                      Order Created
                    </span>
                    {new Date(order?.createdAt).toDateString()}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Order Time</span>
                    {new Date(order?.createdAt).toLocaleTimeString()}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Discount</span>
                    {order?.discount
                      ? -(order?.discount).toFixed(2)
                      : "- ₹0.00"}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Subtotal</span> ₹
                    {sumSubtotalPrice.toFixed(2)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Total</span>₹
                    {order?.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="bg-light-white-opacity w-full h-[100%] px-5 py-5 rounded-lg shadow-md">
                <div className="text-black text-lg font-medium pb-5">
                  Delivery Address
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
