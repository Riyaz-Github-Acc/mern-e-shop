/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  AddShoppingCartRounded,
  CreditScoreOutlined,
  VerifiedUser,
} from "@mui/icons-material";

import stripeLogo from "../../assets/images/logos/stripe-logo.png";

import Button from "../../components/Button";
import Container from "../../components/Container";
import SpinLoading from "../../components/loaders/SpinLoading";

import {
  addOrderToCartAction,
  getCartItemsFromLocalStorageAction,
} from "../../redux/slices/cartsSlice";

import { fetchProductAction } from "../../redux/slices/productsSlice";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Get ID from Params
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [id, dispatch]);

  // Get Data from Store
  const {
    product: { product },
    loading,
    error,
  } = useSelector((state) => state?.products);

  //Get Cart Items
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  // Get Data from Store
  const { cartItems } = useSelector((state) => state?.carts);
  const productExists = cartItems?.find(
    (item) => item?._id?.toString() === product?._id.toString()
  );

  //Add to cart handler
  const addToCartHandler = () => {
    //check if product is in cart
    if (productExists) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is already in cart",
      });
    }

    //Check If Color is Selected
    if (selectedColor === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Please select product color",
      });
    }

    //Check If Size is Selected
    if (selectedSize === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select  product size",
      });
    }

    dispatch(
      addOrderToCartAction({
        _id: product?._id,
        name: product?.name,
        qty: 1,
        price: product?.price,
        description: product?.description,
        color: selectedColor,
        size: selectedSize,
        image: product?.images[0],
        totalPrice: product?.price,
        qtyLeft: product?.qtyLeft,
      })
    );

    Swal.fire({
      icon: "success",
      title: "Good Job",
      text: "Product added to cart successfully",
    });
    return dispatch(getCartItemsFromLocalStorageAction());
  };

  return (
    <Container>
      <main>
        {error ? (
          "Something went wrong!"
        ) : loading ? (
          <SpinLoading />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-6 lg:gap-16 py-16">
              {/* Image Gallery */}
              <section className="flex-1 flex flex-col sm:flex-row justify-between gap-5 lg:gap-10">
                <div className="w-6/6 sm:w-2/6 h-[250px] flex flex-row sm:flex-col items-center gap-2 sm:gap-4 order-2 md:order-1 object-cover">
                  <img
                    src={product?.images[0]}
                    alt="product?.images[0]"
                    className="w-full h-full rounded-lg object-cover cursor-pointer"
                    onClick={() => setSelectedImg(product?.images[0])}
                  />
                  <img
                    src={product?.images[1]}
                    alt="product?.images[1]"
                    className="w-full h-full rounded-lg object-cover cursor-pointer"
                    onClick={() => setSelectedImg(product?.images[1])}
                  />
                </div>

                <div className="w-6/6 sm:w-4/6 h-[550px] order-1 md:order-2">
                  <img
                    src={selectedImg || product?.images[0]}
                    alt="product-image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </section>

              <section className="flex-1">
                <div className="flex flex-col gap-5 px-5">
                  {/* Name */}
                  <h2 className="font-semibold text-2xl md:text-3xl">
                    {product?.name}
                  </h2>

                  {/* Price */}
                  <h3 className="font-semibold text-xl md:text-2xl text-cyan-800">
                    ₹ {product?.price}
                  </h3>

                  {/* Ratings */}
                  <div>
                    <div className="flex items-center gap-3 text-black font-semibold">
                      {product?.reviews?.length > 0
                        ? product?.averageRating
                        : 0}
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              +product?.averageRating > rating
                                ? "text-yellow-400"
                                : "text-gray-500",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="text-cyan-800 font-medium">
                        {product?.totalReviews} Reviews
                      </p>
                    </div>

                    <Link to={`/add-review/${product?._id}`}>
                      <div className="text-blue-800 hover:underline font-medium w-fit mt-3">
                        Leave a review
                      </div>
                    </Link>
                  </div>

                  {/* Color picker */}
                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      Color
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                      >
                        <div className="mt-4 flex items-center space-x-3">
                          {product?.colors?.map((color) => (
                            <RadioGroup.Option
                              key={color}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                style={{ backgroundColor: color }}
                                aria-hidden="true"
                                className={classNames(
                                  "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Size picker */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium text-gray-900">
                        Size
                      </div>
                    </div>
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-3"
                    >
                      {/* Choose size */}
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {product?.sizes?.map((size) => (
                          <RadioGroup.Option
                            key={size}
                            value={size}
                            className={({ active, checked }) => {
                              return classNames(
                                checked
                                  ? "bg-red-500 border-transparent  text-white hover:bg-red-400"
                                  : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer"
                              );
                            }}
                          >
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex flex-wrap items-center justify-between">
                    {/* Add To Cart Button */}
                    {product?.qtyLeft <= 0 ? (
                      <Button type="primaryBtn" disabled="disabled">
                        <AddShoppingCartRounded /> Add To Cart
                      </Button>
                    ) : (
                      <div className="mt-3">
                        <Button
                          type="productPageBtn"
                          onClick={() => addToCartHandler()}
                        >
                          <span className="flex flex-row items-center justify-center gap-3">
                            <AddShoppingCartRounded />
                            Add To Cart
                          </span>
                        </Button>
                      </div>
                    )}

                    {/* Proceed To Checkout Button */}
                    {cartItems.length > 0 && (
                      <Link to="/shopping-cart" className="mt-3">
                        <Button type="productPageBtn" btnType="checkOut">
                          <span className="flex flex-row items-center justify-center gap-3">
                            <CreditScoreOutlined />
                            Proceed To Checkout
                          </span>
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Additional Details */}
                  <section className="mt-2">
                    <h3 className="font-semibold text-lg mb-3">
                      Free shipping on orders over ₹ 5,000!
                    </h3>
                    <ul className="flex flex-col gap-2">
                      <li className="flex flex-row gap-3">
                        <VerifiedUser />
                        Satisfaction Guaranteed
                      </li>
                      <li className="flex flex-row gap-3">
                        <VerifiedUser />
                        No Hassle Refunds
                      </li>
                    </ul>
                    <div className="mt-8">
                      <fieldset>
                        <legend className="font-medium">
                          SAFE CHECKOUT WITH
                        </legend>
                        <img
                          src={stripeLogo}
                          alt="stripe-logo"
                          className="w-52 h-[70px] bg-gray-500 object-cover mt-2"
                        />
                      </fieldset>
                    </div>
                  </section>
                </div>
              </section>
            </div>

            <section className="my-10">
              <div className="flex flex-row justify-center gap-8 mb-8">
                <h1
                  className={`text-xl font-semibold text-gray-900 cursor-pointer transition-all duration-300 hover:border-b-4 hover:border-red-500 ${
                    activeTab === 1 ? "border-b-4 border-red-500" : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  Reviews
                </h1>
                <h1
                  className={`text-xl font-semibold text-gray-900 cursor-pointer transition-all duration-300 hover:border-b-4 hover:border-red-500 ${
                    activeTab === 0 ? "border-b-4 border-red-500" : ""
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  Description
                </h1>
              </div>

              {/* Reviews */}
              {activeTab === 1 && (
                <div aria-labelledby="reviews-heading">
                  <div className="space-y-10 divide-y divide-gray-200 border-t border-b border-gray-300 pb-10">
                    {product?.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                      >
                        <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                          <div className="flex items-center xl:col-span-1">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    review.rating > rating
                                      ? "text-yellow-400"
                                      : "text-gray-500",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="ml-3 text-sm text-gray-900">
                              {review?.rating}
                            </p>
                          </div>

                          <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                            <p className="text-sm font-medium text-gray-900">
                              {review?.comment}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                          <p className="text-lg font-medium text-gray-900">
                            {review?.user?.userName}
                          </p>
                          <time
                            dateTime={review.datetime}
                            className="ml-4 border-l border-gray-300 pl-4 text-gray-900 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                          >
                            {new Date(review?.createdAt)?.toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Details */}
              {activeTab === 0 && (
                <div className="mt-3">
                  <div className="prose prose-sm mt-2 text-gray-500 text-justify">
                    {product?.desc}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </Container>
  );
}
