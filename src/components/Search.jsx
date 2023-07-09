/* eslint-disable no-unused-vars */
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import baseURL from "../utils/baseURL";
import { fetchSearchAction } from "../redux/slices/searchSlice";

import { SearchOutlined } from "@mui/icons-material";

import ErrorMsg from "../components/messages/ErrorMsg";
import SpinLoading from "../components/loaders/SpinLoading";
import NoDataFound from "../components/messages/NoDataFound";

export default function Search() {
  // Page Number
  const [searchResultPage, setSearchResultPage] = useState(1);
  const searchPerPage = 10;

  // Dispatch
  const dispatch = useDispatch();

  // Get Query String
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Ref for the input field
  const inputRef = useRef(null);

  // Input Change Handler
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  // Search Handler
  const handleSearch = () => {
    // Update the URL parameter with the search query
    setParams({ search: searchQuery });

    // Reset the searchResultPage state to 1
    // setSearchResultPage(1);
  };

  // Build Up URL
  let searchUrl = `${baseURL}/products`;

  if (searchQuery) {
    searchUrl = `${baseURL}/products?search=${searchQuery}&page=${searchResultPage}&limit=${searchPerPage}`;
  }

  // Fetch All Products
  useEffect(() => {
    dispatch(
      fetchSearchAction({
        url: searchUrl,
      })
    );
  }, [dispatch, searchUrl, searchQuery, searchResultPage]);

  // Get Data from Store
  const {
    search: { products, total },
    loading,
    error,
  } = useSelector((state) => state?.search);

  // Handle click outside of input field and results container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsTyping(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleChange}
        ref={inputRef}
        className="w-full px-10 py-2 border-zinc-200 focus:border-gray-500 outline-none focus:outline-none rounded-t-md overflow-hidden"
      />
      <div className="absolute top-[18%] left-0 px-2">
        <SearchOutlined />
      </div>

      {isTyping && (
        <div className="absolute w-full bg-white p-5 z-50">
          {loading ? (
            <SpinLoading />
          ) : error ? (
            <ErrorMsg message={error?.message} />
          ) : products?.length <= 0 ? (
            <NoDataFound />
          ) : (
            <div className="flex flex-wrap">
              {products?.map((product) => (
                <div key={product?.id} className="w-1/2">
                  <Link
                    to={`/products/${product?.id}`}
                    className="flex items-center gap-3 hover:bg-zinc-200 p-2 cursor-pointer"
                  >
                    <img
                      src={product?.images[0]}
                      alt={product?.name}
                      className="w-16 h-20 object-cover"
                    />
                    <div>
                      {product?.name}
                      <div className="text-sm text-gray-500">
                        ₹ {product?.price}
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        {product?.category}
                      </div> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
