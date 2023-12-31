/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  Disclosure,
  Menu,
  Transition,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

import baseURL from "../../utils/baseURL";
import { fetchBrandsAction } from "../../redux/slices/brandsSlice";
import { fetchColorsAction } from "../../redux/slices/colorsSlice";
import { fetchProductsAction } from "../../redux/slices/productsSlice";

import Card from "../../components/Card";
import Heading from "../../components/Heading";
import PageBanner from "../../components/PageBanner";
import Pagination from "../../components/Pagination";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SpinLoading from "../../components/loaders/SpinLoading";
import NoDataFound from "../../components/messages/NoDataFound";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const allPrice = [
  {
    amount: "0 - 500",
  },
  {
    amount: "500 - 1000",
  },
  {
    amount: "1000 - 1500",
  },
  {
    amount: "1500 - 2000",
  },
  {
    amount: "2000 - 2500",
  },
  {
    amount: "2500 - 3000",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sizeCategories = ["S", "M", "L", "XL", "XXL"];

export default function ProductsFilters() {
  // Page Number
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dispatch
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get Query String
  const [params, setParams] = useSearchParams();
  const category = params.get("category");

  // Filters
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");

  // Build Up URL
  let productUrl = `${baseURL}/products`;
  if (category) {
    productUrl = `${baseURL}/products?category=${category}&page=${currentPage}&limit=${itemsPerPage}`;
  }
  if (brand) {
    productUrl = `${productUrl}&brand=${brand}`;
  }
  if (size) {
    productUrl = `${productUrl}&size=${size}`;
  }
  if (price) {
    productUrl = `${productUrl}&price=${price}`;
  }
  if (color) {
    productUrl = `${productUrl}&color=${color?.name}`;
  }

  // Fetch All Products
  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch, productUrl, category, size, brand, price, color, currentPage]);

  // Get Data from Store
  const {
    products: { products, total },
    loading,
    error,
  } = useSelector((state) => state?.products);

  // Fetch Brands
  useEffect(() => {
    dispatch(
      fetchBrandsAction({
        url: productUrl,
      })
    );
  }, [dispatch, productUrl]);

  // Get Data from Store
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);

  // Fetch Colors
  useEffect(() => {
    dispatch(
      fetchColorsAction({
        url: productUrl,
      })
    );
  }, [dispatch, productUrl]);

  // Get Data from Store
  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);

  let colorsLoading;
  let colorsError;

  return (
    <div>
      <section>
        <PageBanner pageTitle={category} />
      </section>

      <div>
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/*  */}
                    <Disclosure
                      as="div"
                      key="disclosure"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Choose Color
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {/* Any Color */}
                              {colorsLoading ? (
                                <h2>Loading...</h2>
                              ) : colorsError ? (
                                <h2>{colorsError}</h2>
                              ) : (
                                <RadioGroup onChange={setColor}>
                                  <div className="flex items-start  flex-row flex-wrap">
                                    {colors?.map((color) => (
                                      <RadioGroup.Option
                                        key={color?._id}
                                        value={color}
                                        className={({ active, checked }) =>
                                          classNames(
                                            active && checked
                                              ? "ring ring-offset-1"
                                              : "",
                                            !active && checked ? "ring-2" : "",
                                            " relative  rounded-full flex  flex-col items-center justify-center cursor-pointer focus:outline-none m-2"
                                          )
                                        }
                                      >
                                        <span
                                          style={{
                                            backgroundColor: color?.name,
                                          }}
                                          aria-hidden="true"
                                          className="h-8 w-8 border border-black border-opacity-10 rounded-full"
                                        />
                                      </RadioGroup.Option>
                                    ))}
                                  </div>
                                </RadioGroup>
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                    {/* price categories section */}
                    <Disclosure
                      as="div"
                      key="disclosure"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Price
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6 mt-2">
                              {allPrice?.map((price) => (
                                <div
                                  key={Math.random()}
                                  className="flex items-center"
                                >
                                  <input
                                    onClick={() => setPrice(price?.amount)}
                                    name="price"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                    ₹ {price?.amount}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/*  end price categories section  */}

                    {/* product brand categories section categories section */}
                    <Disclosure
                      as="div"
                      key="disclosure"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Brand
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-2">
                              {brands?.map((brand) => (
                                <div
                                  key={brand?._id}
                                  className="flex items-center"
                                >
                                  <input
                                    onClick={() => setBrand(brand?.name)}
                                    name="brand"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500 capitalize">
                                    {brand?.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/*  end product brand categories section */}

                    {/* product size categories   */}
                    <Disclosure
                      as="div"
                      key="disclosure"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Size
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {sizeCategories.map((size) => (
                                <div key={size} className="flex items-center">
                                  <input
                                    type="radio"
                                    name="size"
                                    onClick={() => setSize(size)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                    {size}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/*  end product size categories section */}
                  </form>
                  {/* end of mobile filters */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-light-gray pb-6">
            <Heading>Product Filters</Heading>

            {/* sort */}
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                {/* <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div> */}

                {/* sort item links */}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex justify-center items-center md:items-start">
              <div className="static lg:sticky top-5 left-0 w-12/12 lg:w-3/12 mr-0 md:mr-10">
                {/* Desktop  Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {/* colors categories Desktop section */}
                  <Disclosure as="div" key="disclosure" className="px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Colors
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>

                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {/* Any Color */}
                            {colorsLoading ? (
                              <h2>Loading...</h2>
                            ) : colorsError ? (
                              <h2>{colorsError}</h2>
                            ) : (
                              <RadioGroup onChange={setColor}>
                                <div className="flex items-start  flex-row flex-wrap">
                                  {colors?.map((color) => (
                                    <RadioGroup.Option
                                      key={color?.id}
                                      value={color}
                                      className={({ active, checked }) =>
                                        classNames(
                                          active && checked
                                            ? "ring ring-offset-1"
                                            : "",
                                          !active && checked ? "ring-2" : "",
                                          " relative  rounded-full flex  flex-col items-center justify-center cursor-pointer focus:outline-none m-2"
                                        )
                                      }
                                    >
                                      <span
                                        style={{ backgroundColor: color?.name }}
                                        aria-hidden="true"
                                        className="h-8 w-8 border border-black border-opacity-10 rounded-full"
                                      />
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* colors end categories section */}

                  {/* price categories section Desktop*/}
                  <Disclosure as="div" key="disclosure" className="px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Price
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6 mt-2">
                            {allPrice?.map((price) => (
                              <div className="flex items-center" key={price}>
                                <input
                                  onClick={() => setPrice(price?.amount)}
                                  name="price"
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  ₹ {price?.amount}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/*  end price categories section  Desktop*/}

                  {/* product brand categories section categories section */}
                  <Disclosure as="div" key="disclosure" className="px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Brand
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-2">
                            {brands?.map((brand) => (
                              <div
                                key={brand?._id}
                                className="flex items-center"
                              >
                                <input
                                  onClick={() => setBrand(brand?.name)}
                                  name="brand"
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500 capitalize">
                                  {brand?.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/*  end product brand categories section */}

                  {/* product size categories  desktop */}
                  <Disclosure as="div" key="disclosure" className="px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Size
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {sizeCategories.map((option) => (
                              <div key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  name="size"
                                  onClick={() => setSize(option)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/*  end product size categories section */}
                </form>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-normal gap-5 w-12/12 lg:w-9/12">
                {/* Product grid */}
                {loading ? (
                  <SpinLoading />
                ) : error ? (
                  <ErrorMsg message={error?.message} />
                ) : products?.length <= 0 ? (
                  <NoDataFound />
                ) : (
                  products?.map((product) => (
                    <Card key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              total={total}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
