/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { CreditScoreOutlined, CardGiftcardOutlined } from "@mui/icons-material";

import Button from "../components/Button";
import Container from "../components/Container";
import PageBanner from "../components/PageBanner";
import ErrorMsg from "../components/messages/ErrorMsg";
import CircularLoading from "../components/loaders/CircularLoading";

import {
  changeOrderItemQty,
  getCartItemsFromLocalStorageAction,
  removeOrderItemQty,
} from "../redux/slices/cartsSlice";
import { fetchCouponAction } from "../redux/slices/couponsSlice";

export default function ShoppingCart() {
  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  // Coupon State
  const [couponCode, setCouponCode] = useState(null);
  const applyCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCouponAction(couponCode));
    setCouponCode("");
  };

  // Get Coupon from Store
  const { coupon, loading, error } = useSelector((state) => state?.coupons);

  // Get Cart Items from Store
  const { cartItems } = useSelector((state) => state?.carts);

  // Add To Cart Handler
  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeOrderItemQty({ productId, qty }));
    dispatch(getCartItemsFromLocalStorageAction());
  };

  // Calculate Total Price
  let sumTotalPrice = 0;
  let subTotalPrice = 0;
  let discountAmount = 0;
  subTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);

  // Check If Coupon Exist
  if (coupon) {
    discountAmount = (subTotalPrice * coupon?.coupon?.discount) / 100;
    sumTotalPrice = subTotalPrice - discountAmount;
  } else {
    sumTotalPrice = subTotalPrice;
  }

  // Remove Cart Itme Handler
  const removeOrderItemQtyHandler = (productId) => {
    dispatch(removeOrderItemQty(productId));
    dispatch(getCartItemsFromLocalStorageAction());
  };
  return (
    <div>
      <PageBanner pageTitle="Shopping Cart" />
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <h2 className="font-semibold text-xl md:text-2xl mb-3">
              Items In Your Shopping Cart
            </h2>

            <ul
              role="list"
              className="flex flex-col gap-6 bg-white px-6 py-6 rounded-xl"
            >
              {cartItems.length <= 0
                ? "No products found! Please add some products to your cart!"
                : cartItems?.map((product) => (
                    <li key={product._id} className="flex">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-32 w-32 rounded-md object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <p className="text-sm md:text-lg font-medium text-light-blue">
                                {product.name}
                              </p>
                            </div>

                            <div className="flex text-sm md:text-md text-dark-blue my-2 md:my-3">
                              <p className="capitalize">{product.color}</p>

                              <p className="ml-4 border-l border-zinc-200 pl-4">
                                {product.size}
                              </p>
                            </div>

                            <p className="text-sm md:text-[16px] font-medium text-[#2a2a2a]">
                              ₹ {product?.price} x {product?.qty} = ₹{" "}
                              {product?.totalPrice}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label className="sr-only">
                              Quantity, {product.name}
                            </label>
                            <select
                              onChange={(e) =>
                                changeOrderItemQtyHandler(
                                  product?._id,
                                  e.target.value
                                )
                              }
                              className="w-10 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-200 sm:text-sm"
                            >
                              {/* Quantity Left  */}
                              {[...Array(product?.qtyLeft)?.keys()]?.map(
                                (x) => {
                                  return (
                                    <option key={x} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                }
                              )}
                            </select>

                            {/* Remove */}
                            <div className="absolute top-0 right-0">
                              <button
                                onClick={() =>
                                  removeOrderItemQtyHandler(product?._id)
                                }
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-semibold text-black"
            >
              Order Summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-black">
                  ₹ {subTotalPrice.toFixed(2)}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Discount</dt>
                <dd className="text-sm font-medium text-black">
                  - ₹ {discountAmount.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4"></div>

              {/* Add Coupon */}
              {coupon ? (
                <div className="w-full flex items-center justify-between text-sm">
                  <div>
                    Coupon Applied:{" "}
                    <span className="font-semibold">
                      {coupon?.coupon?.code}
                    </span>
                  </div>
                  <div>
                    Discount:{" "}
                    <span className="font-semibold">
                      {coupon?.coupon?.discount}%
                    </span>
                  </div>
                </div>
              ) : (
                <span>Have coupon code?</span>
              )}

              {/* Error */}
              {error && <ErrorMsg message={error?.message} />}

              <form onSubmit={applyCouponSubmit}>
                <div className="mt-1">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    type="text"
                    className="block w-full rounded-md border p-2 border-gray-500 shadow-sm focus:border-zinc-200 focus:ring-zinc-200 sm:text-sm"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                {loading ? (
                  <Button type="greenBtn" disabled>
                    <div className="flex items-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="greenBtn">
                    <div className="flex items-center gap-2">
                      <CardGiftcardOutlined fontSize="small" />
                      <div>Apply Coupon</div>
                    </div>
                  </Button>
                )}
              </form>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-black">
                  Order total
                </dt>
                <dd className=" text-xl font-medium text-black">
                  ₹ {sumTotalPrice.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-2">
              <Link
                // Pass Data to Checkout Page
                to="/order-payment"
                state={{
                  sumTotalPrice,
                }}
              >
                <Button type="primaryBtn">
                  <span className="flex flex-row items-center justify-center gap-3">
                    <CreditScoreOutlined />
                    Proceed To Checkout
                  </span>
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
