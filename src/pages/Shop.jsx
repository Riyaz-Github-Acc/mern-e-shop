/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import baseURL from "../utils/baseURL";
import { fetchCategoriesAction } from "../redux/slices/categoriesSlice";

import Container from "../components/Container";
import PageBanner from "../components/PageBanner";
import CategoryCard from "../components/CategoryCard";
import SpinLoading from "../components/loaders/SpinLoading";
import Pagination from "../components/Pagination";

const Shop = () => {
  // Page Number
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get Data from Store
  const {
    categories: { categories, total },
    loading,
    error,
  } = useSelector((state) => state?.categories);

  // Build Up URL
  const categoryUrl = `${baseURL}/categories?page=${currentPage}&limit=${itemsPerPage}`;

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction({ url: categoryUrl }));
  }, [dispatch, categoryUrl, currentPage]);

  return (
    <section>
      <PageBanner pageTitle="Shop" />

      <Container>
        {loading ? (
          <SpinLoading />
        ) : error ? (
          <p>Something went wrong!</p>
        ) : (
          <>
            <div className="flex flex-wrap flex-row items-center justify-center gap-5">
              {categories?.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              total={total}
            />
          </>
        )}
      </Container>
    </section>
  );
};

export default Shop;
