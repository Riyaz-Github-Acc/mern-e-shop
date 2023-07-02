import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getCartItemsFromLocalStorageAction } from "../redux/slices/cartsSlice";
import { placeOrderAction } from "../redux/slices/ordersSlice";
import { getUserProfileAction } from "../redux/slices/usersSlice";

import ErrorMsg from "../components/messages/ErrorMsg";
import AddShippingAddress from "../components/AddShippingAddress";
import CircularLoading from "../components/loaders/CircularLoading";
import Container from "../components/Container";
import PageBanner from "../components/PageBanner";

export default function OrderPayment() {
  //get data from location
  const location = useLocation();
  const { sumTotalPrice } = location.state;

  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  //get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  const { profile } = useSelector((state) => state?.users);
  const user = profile?.user;

  //place order action
  //get shipping address
  const shippingAddress = user?.shippingAddress;
  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        shippingAddress,
        orderItems: cartItems,
        totalPrice: sumTotalPrice,
      })
    );
  };
  const { loading, error } = useSelector((state) => state?.orders);

  return (
    <div>
      {error && <ErrorMsg message={error?.message} />}
      <PageBanner pageTitle="Order Payment" />

      <Container>
        <main className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div className="border-t border-gray-200">
                {/* Shipping Address */}
                <AddShippingAddress />
              </div>

              {/* Order summary */}
              <div className="mt-5 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems?.map((product) => (
                      <li key={product._id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product._id}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex flex-col gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-500">
                                {product.name}
                              </p>
                            </div>

                            <div className="flex flex-row items-center">
                              <p className="text-sm text-gray-500">
                                {product.size}
                              </p>
                              <p className="ml-2 border-l border-zinc-200 pl-2 text-sm text-gray-500 capitalize">
                                {product.color}
                              </p>
                            </div>

                            <div className="flex flex-1 justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                ₹ {product?.price} X {product?.qty} = ₹
                                {product?.totalPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 pb-6 px-4 sm:px-6">
                    {/* <div className="flex items-center justify-between border-t border-gray-200 ">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ 0.00
                      </dd>
                    </div> */}
                    <div className="flex items-center justify-between pt-6">
                      <dt className="text-base font-medium">Sub Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ {sumTotalPrice.toFixed(2)}
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    {loading ? (
                      <button className="w-full flex flex-col items-center justify-center bg-cyan-800 focus:outline-none focus:shadow-lg text-md text-white font-medium font-heading py-[14px] px-[35px] mt-2 rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed">
                        <div className="flex items-center gap-2">
                          <div>Loading...</div>
                          <CircularLoading />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={placeOrderHandler}
                        className="w-full flex flex-col items-center justify-center bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md text-white font-medium font-heading py-[14px] px-[35px] mt-2 rounded-md"
                      >
                        Confirm Payment - ₹ {sumTotalPrice.toFixed(2)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}
